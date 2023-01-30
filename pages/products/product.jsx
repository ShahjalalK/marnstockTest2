import Image from "next/image";
import React, { useState } from "react";
import baseUrl from "../../helpers/baseUrl";
import {parseCookies} from 'nookies'

export default function Product() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(Number);
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");

  const [descriptionAlert, setDescriptionAlert] = useState("");

  let pathUrl 

  const submitHandler = async (e) => {
    e.preventDefault();
        await uplodImage();    
    const res = await fetch(`${baseUrl}/api/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        mediaUrl : pathUrl,
        description,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      setDescriptionAlert(res2.error);
    } else {
      setDescriptionAlert(res2.success);
    }
  };
 
  const uplodImage = async () => {
    if (media) {
      let data = new FormData();
      data.append("file", media);
      data.append("upload_preset", "mystore");
      data.append("cloud_Name", "dfgnwxo3b");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dfgnwxo3b/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const res2 = await res.json();        
        pathUrl = res2.public_id       
    } else {
      return "";
    }
  };
  return (
    <div className="max-w-lg p-5 mx-auto bg-white ">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="w-full border rounded p-1 outline-none"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          className="w-24 border rounded p-1 outline-none mt-5"
          min={1}
          placeholder="$"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full border rounded p-1 outline-none mt-5"
          onChange={(e) => setMedia(e.target.files[0])}
        />

        <Image
          src={media ? URL.createObjectURL(media) : ""}
          width={0}
          height={0}
          className="w-auto h-auto"
          alt={media ? "meida" : null}
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="w-full border rounded p-1 outline-none mt-5"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <p>{descriptionAlert}</p>
        <button
          type="submit"
          className="w-full border bg-gray-600 rounded p-1 outline-none mt-5 text-lg font-medium text-gray-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const {user, token} = parseCookies(ctx)
  if(!token){
    const {res} = ctx
      res.writeHead(302, {location : '/users/login'})
      res.end()
  }else{
    if(user.role !== 'admin' || user.role !== 'root'){
      const {res} = ctx
      res.writeHead(302, {location : '/users/account'})
      res.end()
    }
  }
  
  return {
    props: {}, // will be passed to the page component as props
  }
}