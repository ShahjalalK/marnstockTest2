import React from "react";
import { getProviders, signIn as SigninToProvider } from "next-auth/react";
import Header from "@/components/header";
import { useRouter } from "next/router";
import Image from "next/image";
import ImageLoader from "@/components/imgLoader";

export default function Signin({ providers }) {

  return (
    <>
      <Header />
      <div className="container flex flex-col items-center justify-center text-center -mt-44 min-h-screen">
        <div className="mb-20 text-center flex flex-col items-center justify-start">
          <Image
            loader={ImageLoader}
            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png`}
            width={350}
            height={350}
            alt="instagram"
            className="w-72 "
          />
          <p>It is a not real app. it is build for educational propose only</p>
        </div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => SigninToProvider(provider.id, {callbackUrl : "/"})}
              className="px-7 py-1 bg-blue-500 rounded-lg text-white"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
