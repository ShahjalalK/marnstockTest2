import Link from 'next/link'
import React from 'react'
import Navbar2 from './navbar2'
import {parseCookies} from 'nookies'

export default function PageNotFound() {
    const cookie = parseCookies()
  const user = cookie.user ? JSON.parse(cookie.user) : ""
  return (
    <>
    {!user && <Navbar2 />}
    
        <div className=" py-5 flex flex-col space-y-5 text-center">
            <h1 className="text-4xl">Sorry, this page isn't available.</h1>
            <p className="mt-5">The link you followed may be broken, or the page may have been removed. <Link href="/" className="text-blue-500">Go back to Instagram.</Link></p>
        </div>
    </>
  )
}
