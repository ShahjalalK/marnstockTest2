import Image from "next/image";
import React from "react";
import {FiSearch} from 'react-icons/fi'
import {FaRegPaperPlane} from 'react-icons/fa'
import {MdBusinessCenter} from 'react-icons/md'
import {AiFillHome, AiOutlineMenu, AiOutlineHeart} from 'react-icons/ai'
import {BiPlusCircle} from 'react-icons/bi'
import ImageLoader from "./imgLoader";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const {data : session} = useSession()
   const router = useRouter()
  return (
    <div className=" shadow-sm border-b bg-white py-5 sticky top-0 z-50">
      <div className="flex items-center justify-between bg-white container">
        {/* Left */}
        <div className=" w-36 relative hidden lg:inline-grid cursor-pointer" onClick={() => router.push("/")}>
          <Image loader={ImageLoader} src="https://links.papareact.com/ocw" width={350} height={350} className=" object-contain" />
          
        </div>
        <div className="w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image loader={ImageLoader} src="https://links.papareact.com/jjm" width={15} height={15} className=" w-full object-cover" />
          
        </div>

        {/* Middle */}
       <div className="text-gray-500 relative ">
        <div className=" absolute inset-y-0 pl-1 flex items-center rounded-md pointer-events-none"><FiSearch /></div>
        <input type="text" placeholder="Search" className=" focus:ring-black pl-6 focus:border-black border-gray-500" />
       </div>
      
        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
        <Link href="/" ><AiFillHome className="text-2xl" /></Link>

        {session ? (
            <>
            
            <AiOutlineMenu className="text-2xl" />
      <div className=" relative">
      <FaRegPaperPlane className="text-2xl" />
      <div className=" absolute -top-1 -right-2 bg-red-500 rounded-full flex justify-center items-center text-white animate-pulse w-5 h-5">3</div>
      </div>
      <BiPlusCircle className="text-2xl"/>
      <MdBusinessCenter className="text-2xl"/>
      <AiOutlineHeart className="text-2xl"/>
      <div className="w-10 h-10 rounded-full overflow-hidden ">
      <Image loader={ImageLoader} src={session?.user.image} width={50} height={50} alt="profile" className="w-full object-cover cursor-pointer" onClick={signOut} />
      </div>
            
            </>
        ) : (
          <>
          <button onClick={ signIn }>Signin</button>
          </>
        )}
      
        </div>
      </div>
    </div>
  );
}
