import BaseUrl from "@/helpers/baseUrl";
import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import userContext from "../userConext";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

export default function Create() {
  const router = useRouter()
  const { model, setModel } = useContext(userContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const [error, setError] = useState('')

  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : ""
 
  const submitHandler = async (e) => {
    e.preventDefault();
    const photo = await uploadPhoto();
    
    const res = await fetch(`${BaseUrl}/api/instagrampost`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : cookie.token
      },
      body : JSON.stringify({
        title,
        description,
        photo
      })
    })
    const res2 = await res.json()
    if(res2.error){
      setError(res2.error)
    }else{
      setError(res2.message)
      setTitle('')
      setDescription('')
      setMediaUrl('')
      router.push(`/profile/${user._id}`)
    }

  };

  const uploadPhoto = async () => {
    let data = new FormData();
    data.append("file", mediaUrl);
    data.append("upload_preset", "mystore");
    data.append("cloud_name", "dfgnwxo3b");
    const res = await fetch ('https://api.cloudinary.com/v1_1/dfgnwxo3b/image/upload', {
     method : "POST",
     body : data,
    })
    const res2 = await res.json()
    return res2.public_id
  };
  return (
    <div className={model ? "createModel active" : "createModel"}>
      <div
        className="absolute top-5 right-10 z-10 cursor-pointer text-white text-3xl"
        onClick={() => setModel(!model)}
      >
        <AiOutlineClose />
      </div>
      <div className="max-w-sm mx-auto mt-20 rounded-lg flex items-center justify-center flex-col bg-white ">
        <h1 className="text-lg pt-5">Create new post</h1>

        <form className="p-5 w-full" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-1 border rounded outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Body"
            className="w-full mt-2 p-1 border rounded outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="file"
            className=" border outline-none mt-2"
            onChange={(e) => setMediaUrl(e.target.files[0])}
          />
          <p className="text-sm text-blue-500">{error}</p>
          <button className="mt-10 w-full bg-blue-500 text-white py-1 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
