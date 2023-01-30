import baseUrl from "@/helpers/baseUrl";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import {parseCookies} from 'nookies'
import Cookies from "js-cookie";

export default function productId({ data }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1)
  const loaders = ({ src }) => {
    return `https://res.cloudinary.com/dfgnwxo3b/image/upload/${src}`;
  };

  const cookies = parseCookies()
  const user = cookies.user ? JSON.parse(cookies.user) : ""
  const deletHandler = async () => {
    await fetch(`${baseUrl}/api/products/${data._id}`, {
      method: "DELETE",
    });
    router.push("/");
  };
  const addToCart = async (pid) => {    
    const res = await fetch(`${baseUrl}/api/users/cart`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : cookies.token
      },
      body : JSON.stringify({
        quantity,
        productId : pid
      })
    })
    const res2 = await res.json()
    alert(res2.message)
  }
  return (
    <div className="max-w-3xl mx-auto py-5">
      <div className="text-3xl mb-3 px-3 font-medium">{data.title}</div>
      <Image
        loader={loaders}
        src={data.mediaUrl}
        alt={data.title}
        width={350}
        height={350}
        className="w-[50%]"
      />
      <div className="flex items-center">
        {" "}
        <input
          type="number"
          min={1}
          className="border border-gray-500 rounded bg-transparent my-3 p-1 outline-none"
          value={quantity}
          onChange = {(e) => Number(setQuantity(e.target.value))}
        />
        {user ? <button className="text-3xl" onClick={() => addToCart(data._id)}>
          <IoMdAddCircle className="bg-gray-500" />
        </button> : <button className="text-orange-500 text-lg font-medium ml-1" onClick={() => {
          Cookies.remove('user')
          Cookies.remove('token')
          router.push('/users/login')
        }}>Login Now</button>}
        
      </div>
      <div className="text-3xl font-medium p-3">${data.price}</div>
      <p className="text-lg px-3 ">
        <span className="font-medium border-b border-gray-800 pb-1">
          Product Details:
        </span>{" "}
        {data.description}
      </p>
      {user.role === 'admin' && user.role === 'root' && 
      <button
      type="button"
      className="my-5 px-5 py-1 text-white bg-red-600 text-lg"
      onClick={deletHandler}
    >
      Delete
    </button>
      }
      
    </div>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${baseUrl}/api/products/${id}`);
  const data = await res.json();
  return {
    props: { data }, // will be passed to the page component as props
  };
}
