import Image from "next/image";
import React, { useContext, useState } from "react";
import Login from "./accounts/login";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import BaseUrl from "@/helpers/baseUrl";
import { useRouter } from "next/router";
import Link from "next/link";
import userContext from "./userConext";
const loaders = ({ src }) => {
  return `https://res.cloudinary.com/dfgnwxo3b/image/upload/${src}`;
};

export default function Home({allPost}) {
  const {toast} = useContext(userContext)
  const [text, setText] = useState('')
  const router = useRouter(); 
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  const [data, setData] = useState(allPost);

console.log('DATA', data)
  const likeHandler = async (id) => {
    const res = await fetch(`${BaseUrl}/api/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookie.token,
      },
      body: JSON.stringify({
        postId: id,
      }),
    });
    const result = await res.json();
    const newData = data.map((item) => {
      if (item._id == result._id) {
        return result;
      } else {
        return item;
      }
    });
    console.log(newData);
    setData(newData);
    router.push("/");    
  };
  const unlikeHandler = async (id) => {
    const res = await fetch(`${BaseUrl}/api/unlike`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookie.token,
      },
      body: JSON.stringify({
        postId: id,
      }),
    });
    const result = await res.json();
    const newData = data.map((item) => {
      if (item._id == result._id) {
        return result;
      } else {
        return item;
      }
    });
    setData(newData);
    router.push("/");
  };

  const commentHandler = async (postId) => {
    const res = await fetch(`${BaseUrl}/api/comments`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookie.token,
      },
      body: JSON.stringify({
        text,
        postId
      })     
    })
    const result = await res.json();
    const newData = data.map((item) => {
      if (item._id == result._id) {
        return result;
      } else {
        return item;
      }
    });    
    setData(newData);
    setText('')
    router.push("/");
    
  };

 

  return (
    <>
      {user ? (
        <div className="grid grid-cols-12 p-5 ">
          <div className="col-span-8">
            {data.map((post) => {
              return (
                <div className="max-w-xl mx-auto bg-white my-3" id={`${post._id}`}>
                  <div className="p-5 flex items-center gap-3">
                    <img
                      src="/profile.jpg"
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="text-sm">
                      <Link href="/profile/[id]" as={`/profile/${post.postById._id}`} className="text-lg font-medium">
                        {post.postById.name}
                      </Link>
                      <p>Wake Forest, North Carolina</p>
                    </div>
                  </div>
                  <Image
                    loader={loaders}
                    src={post.photo}
                    alt=""
                    width={350}
                    height={350}
                    className="w-full h-auto"
                  />
                  <div className="p-5">
                    <div className=" cursor-pointer">
                      {post.likes.includes(user._id) ? (
                        <span
                          className="text-3xl text-red-500"
                          onClick={() => unlikeHandler(post._id)}
                        >
                          <AiFillHeart />
                        </span>
                      ) : (
                        <span
                          className="text-3xl text-red-500"
                          onClick={() => likeHandler(post._id)}
                        >
                          <AiOutlineHeart />
                        </span>
                      )}
                    </div>
                    <h6 className="text-lg">{post.likes.length} likes</h6>
                    {post.comments.map(item => {
                      console.log(item)
                      return(
                        <h6> <span className=" font-medium text-sm"><Link href="/profile/[id]" as={`/profile/${item.postedBy._id}`}>
                        {item.postedBy.name}
                      </Link></span> {item.text}</h6>
                      )
                    })}
                    <h1 className="text-xl">{post.title}</h1>
                    <p>{post.description}</p>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                     commentHandler(post._id)                     
                    }} className="flex items-center">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="w-full border-b outline-none mt-3"
                        value={text} 
                        onChange={(e) => setText(e.target.value)}                       
                      />
                      {text && <button className="text-xs bg-gray-500 text-gray-100 px-3 py-1">
                        post
                      </button>}
                      
                    </form>
                  </div>
                 
                </div>
              );
            })}
          </div>
          <div className="col-span-4">
            <img src="post1.jpg" alt="" className="w-full h-auto" />
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl flex gap-3 items-center py-5">
          <div className="w-full">
            <Image
              src="/instagram.PNG"
              width={350}
              height={500}
              alt="instagram"
            ></Image>
          </div>
          <div className="w-full">
            <Login />
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${BaseUrl}/api/allpost`);
  const allPost = await res.json();
 
  return {
    props: { allPost },
  };
}
