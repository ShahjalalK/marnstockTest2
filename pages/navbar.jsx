import React, { useContext } from 'react'
import {VscHome} from 'react-icons/vsc'
import {BiSearchAlt2, BiUpload, BiLogOutCircle} from 'react-icons/bi'
import Link from 'next/link'
import Image from 'next/image'
import userContext from './userConext'
import { useRouter } from 'next/router'
import {parseCookies} from 'nookies'
import Cookies from 'js-cookie'

export default function Navbar() {
  const router = useRouter()
   const {model, setModel} = useContext(userContext)
   const cookie = parseCookies()
   const user = cookie.user ? JSON.parse(cookie.user) : ""
  return (
    <nav className="bg-white h-screen px-5">
        <h1 className="text-2xl font-Lobster py-10 text-gray-700">Instagram</h1>
        <div className="flex flex-col space-y-3 mt-7">
            <Link href="/" className="flex gap-3 items-center text-gray-800 ">
                <span className="text-2xl text-gray-900"><VscHome /></span>
                <span>Home</span>
            </Link>
            <Link href="/" className="flex gap-3 items-center text-gray-800">
                <span className="text-2xl text-gray-900"><BiSearchAlt2 /></span>
                <span>Search</span>
            </Link>
            <button className="flex gap-3 items-center text-gray-800" 
            onClick={() => {
              setModel(!model)
              
            }}>
                <span className="text-2xl text-gray-900"><BiUpload /></span>
                <span>Create</span>
            </button>
            <Link href="/profile/[id]" as={`/profile/${user._id}`} className="flex gap-3 items-center text-gray-800">
               <Image src="/profile.jpg" width={30} height={30} alt="profile" className="rounded-full border-2  border-gray-700" />
                <span>Profile</span>
            </Link>
            <button className="flex gap-3 items-center text-gray-800 " onClick={() => {
                Cookies.remove('user')
                Cookies.remove('token')
                router.push('/accounts/login')
            }}>
                <span className="text-2xl text-gray-900"><BiLogOutCircle /></span>
                <span>Logout</span>
            </button>
        </div>
    </nav>
  )
}
