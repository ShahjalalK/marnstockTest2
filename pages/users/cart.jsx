import baseUrl from '@/helpers/baseUrl'
import React, { useState } from 'react'
import {parseCookies} from 'nookies'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Cart({error, products}) {
  const [cProducts, setCProducts] = useState(products)
  let price = 0
  const loaders = ({ src }) => {
    return `https://res.cloudinary.com/dfgnwxo3b/image/upload/${src}`;
  };
  const router = useRouter()
  const {token} = parseCookies()
  if(error){
    Cookies.remove('user')
    Cookies.remove('token')
    router.push('/users/login')
  }
  if(!token){
    return(
      <div className="text-center py-5">
        <h1 className="text-4xl">Please login and add to cart</h1>
        <button className="px-7 py-1 text-lg bg-gray-700 text-gray-50 mt-5" onClick={() => router.push('/users/login')}>Login</button>
      </div>
    )
  }
 
  const removeProduct = async (pid) => {
    const res = await fetch(`${baseUrl}/api/users/cart`, {
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : token
      },
      body : JSON.stringify({
        productId : pid
      })
    })
    const res2 = await res.json()
    setCProducts(res2)
  }
  return (
    <>
    
    <div className="container pt-5 flex flex-col gap-5">
      {cProducts.map((item, index) => {
        price = price + item.quantity * item.product.price
        return(
          <div key={index} className="flex items-center gap-5">
            <Image loader={loaders} src={item.product.mediaUrl} width={150} height={150} alt={item.product.title} />
            <div>
              <p>{item.product.title.substring(0, 40)}</p>
              <p>{item.quantity} X ${item.product.price}</p>
              <button className="bg-red-600 text-gray-50 px-5 py-1 text-sm inline-block mt-2" 
              onClick={() => removeProduct(item.product._id)}
              >Remove</button>
            </div>
          </div>
        )
      })}
    </div>
    <div className="h-[2px] container bg-red-900 my-5">     
    </div>
    <div className="container flex items-center justify-between">
      <h6 className="text-3xl">Total = ${price} </h6>
      <button className="bg-green-900 text-gray-50 px-5 py-1 text-sm">Checkout</button>
    </div>
    
    
    </>
  )
}

export async function getServerSideProps(ctx) {
  const {token} = parseCookies(ctx)
  if(!token){
    return {
      props: {products : []}
    }
  }
  const res = await fetch(`${baseUrl}/api/users/cart`,{
    headers : {
      "Content-Type" : "application/json",
      "Authorization" : token
    }
  })  
  const products = await res.json()
 if(products.error){
  return {
    props: {error : products.error}
  }
 }
  return {
    props: {products}
  }
}