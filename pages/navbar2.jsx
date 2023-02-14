import { useRouter } from 'next/router'
import React from 'react'

export default function Navbar2() {
    const router = useRouter()
  return (
    <div className="py-5 border-b border-gray-300">
        <div className="container grid grid-cols-3 items-center justify-center">
        <h1 className="font-Lobster text-3xl">Instagram</h1>
        <input type="search" className="w-full p-1 bg-gray-100 border border-gray-300 outline-none text-gray-500" placeholder='Search' />
        <div className="items-center text-center">
            <button className="px-3 py-1 text-white bg-blue-500 rounded" onClick={() => router.push("/accounts/login")}>Login</button>
            <button className="px-3 py-1  text-blue-500 rounded" onClick={() => router.push("/accounts/signup")}>Sign up</button>
        </div>
    </div>
    </div>
  )
}
