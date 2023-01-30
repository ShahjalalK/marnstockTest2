import Image from "next/image";
import Link from "next/link";
import React from "react";
import baseUrl from "../helpers/baseUrl";

export default function Home({ products }) {
  console.log(products);
  const loaders = ({ src }) => {
    return `https://res.cloudinary.com/dfgnwxo3b/image/upload/${src}`;
  };
  return (
    <div className="container py-5 ">
      <div className="grid grid-cols-4 gap-5">
        {products &&
          products.map((item, index) => {
            return (
              <div key={index} className="bg-white p-3 border-spacing-3 border-gray-900">
                <h1 className="text-xl font-medium mb-3">{item.title.substring(0, 40)}</h1>
                <div className="relative h-40 overflow-hidden">
                  <Image
                    loader={loaders}
                    src={item.mediaUrl}
                    width={300}
                    height={300}
                    alt={item.title}
                    className=" h-full w-full"
                  ></Image>                 
                </div>
                <div className="p-3 flex items-center justify-between">
                  <Link href="/products/[id]" as={`/products/${item._id}`} className="text-[#007185] inline-block text-sm hover:text-orange-500">Shop now</Link>
                  <span className="text-lg font-medium">${item.price}</span>
                </div>
                
                <div>
                
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`${baseUrl}/api/product`);
  const products = await res.json();
  return {
    props: { products }, // will be passed to the page component as props
  };
}
