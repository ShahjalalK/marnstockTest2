import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { parseCookies } from "nookies";
import BaseUrl from "@/helpers/baseUrl";
import userContext from "../userConext";
import Image from "next/image";

export default function Signup() {
  const { toast } = useContext(userContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [media, setMedia] = useState("");

  const [error, setError] = useState("");
  const sumbitHandler = async (e) => {
    e.preventDefault();
    const ppic = await photoUpload();
    const res = await fetch(`${BaseUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
        ppic
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      setError(res2.error);
    } else {
      toast(res2.message);
      router.push("/accounts/login");
    }
  };

  const photoUpload = async () => {
    let data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "mystore");
    data.append("cloud_name", "dfgnwxo3b");

   const res = await fetch("https://api.cloudinary.com/v1_1/dfgnwxo3b/image/upload", {
      method: "POST",
      body: data,
    });
    const res2 = await res.json()
    return res2.public_id
  };
  const loaders = ({ src }) => {
    return `https://res.cloudinary.com/dfgnwxo3b/image/upload/v1675941362/${src}`;
  };
  return (
    <>
      <div className="max-w-sm mx-auto bg-white border border-gray-300 py-5 my-5 select-none">
        <h1 className="text-4xl font-Lobster text-center">Instagram</h1>

        <div className="max-w-xs mx-auto py-5 ">
          <p className=" mb-4 text-xl font-medium text-gray-500 text-center">
            Sign up to see photos and videos from your friends.
          </p>
          <form onSubmit={sumbitHandler}>
            <Image
              loader={loaders}
              src={media ? URL.createObjectURL(media) : "user_1_e7n98o.png"}
              width={80}
              height={80}
              className="border border-gray-300 rounded-full text-center mx-auto my-2 w-24 h-24 object-cover"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border outline-none rounded-1 p-1 text-sm bg-[#f1f1f1]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border outline-none rounded-1 p-1 text-sm bg-[#f1f1f1] mt-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="w-full border outline-none rounded-1 p-1 text-sm bg-[#f1f1f1] mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMedia(e.target.files[0])}
              className="w-full border outline-none rounded-1 p-1 text-sm bg-[#f1f1f1] mt-3"
            />
            <p className="text-sm text-red-400">{error}</p>
            {email && name && password ? (
              <button
                type="submit"
                className="p-1 bg-blue-500 text-sm mt-5 rounded-1 w-full text-white"
              >
                Sign up
              </button>
            ) : (
              <button
                type="submit"
                disabled
                className="p-1 bg-blue-400 text-sm mt-5 rounded-1 w-full text-white"
              >
                Sign up
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="max-w-sm mx-auto bg-white border border-gray-300 py-5 my-5 select-none">
        <h1 className="text-sm text-center">
          Have an account?{" "}
          <Link href="/accounts/login" className="text-blue-500">
            Log in
          </Link>
        </h1>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  // if(token){
  //     const {res} = ctx
  //     res.writeHead(302, {location : "/users"})
  //     res.end()
  // }
  return {
    props: {}, // will be passed to the page component as props
  };
}
