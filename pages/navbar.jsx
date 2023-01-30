import Link from "next/link";
import React from "react";
import {parseCookies} from 'nookies'
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter()
  const cookie = parseCookies()
  const user = cookie.user ? JSON.parse(cookie.user) : ""
  return (
    <div className="bg-black text-gray-300 py-2">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-3xl inline-block uppercase font-bold">
          Logo
        </Link>
        <div className="flex items-center gap-3 text-lg font-medium capitalize">
          {user ? 
          <>
          {(user.role === 'root' || user.role === 'admin') && <Link href="/products/product">Product</Link> } 
          <Link href="/users/cart">Cart</Link>
          <Link href="/users/account">Account</Link>
          <button className="px-5 py-1 bg-gray-700 text-white" 
          onClick={ () => {
            Cookies.remove('user')
            Cookies.remove('token')
            router.push('/users/login')
          } }>Logout</button>
                   
          </>
          :
          <>
          <Link href="/users/cart">Cart</Link>
          <Link href="/users/login">Login</Link>
          <Link href="/users/signup">Signup</Link>          
          
          </>
        }
                   
        </div>
      </div>
    </div>
  );
}
