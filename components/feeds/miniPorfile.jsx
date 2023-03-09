import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import ImageLoader from '../imgLoader'

export default function MiniProfile() {
  const {data : session} = useSession()
 
  return (
    <div className="flex items-center space-x-4 mt-14 ml-10">
     
      <Image src={session?.user.image} width={50} height={50} alt="profile" className="w-12 h-12 border object-cover rounded-full p-[2px]" loader={ImageLoader}/>
      <div className="flex flex-col space-y-0">
        <h1 className="font-bold">{session?.user.name}</h1>
        <p className="text-gray-400">Welcome to instagram</p>
      </div>
      <button className="text-blue-400 text-sm font-semibold" onClick={signOut}>Logout</button>
    </div>
  )
}
