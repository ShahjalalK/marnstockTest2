import BaseUrl from '@/helpers/baseUrl'
import Image from 'next/image'
import React, { useState } from 'react'
import {parseCookies} from 'nookies'


export default function EditProfile({data}) {
  console.log("Shahjalal Khan my",data)
    const [name, setName] = useState('')
    const [media, setMedia] = useState('')
    const {token} = parseCookies()

  const submitHandler = async (e) => {
    e.preventDefault()
    // const res = await fetch(`${BaseUrl}/api/profile/`)
  }
  return (
    <div className="max-w-lg mx-auto">
        <h1 className="text-center text-5xl my-5">Update your profile</h1>
        <form className="bg-white p-3" onSubmit={submitHandler}>
           {media && <Image src={media ? URL.createObjectURL(media) : ""} width={80} height={80} alt="profile" className="rounded-full border mx-auto mb-3 w-24 h-24 object-cover "/>} 
            <input type="text" className="w-full border rounded p-1 outline-none" placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" disabled className="w-full border rounded p-1 outline-none mt-3" placeholder='Email Not Change' />
            <input type="file" accept='image/*' onChange={(e) => setMedia(e.target.files[0])} className="w-full border rounded p-1 outline-none mt-3" />
            <button type="submit" className="w-full border rounded p-1 outline-none my-5 bg-gray-500">Update profile</button>
        </form>
    </div>
  )
}


export async function getServerSideProps(ctx) {
  const {token} = parseCookies()
  console.log(token)
  
  const res = await fetch(`${BaseUrl}/api/profile/${ctx.params.id}`, {
    headers : {
      "Content-Type" : "application/json",
      "Authorization" : token
    }
  })
  const data = await res.json()
  return {
    props: {data}, // will be passed to the page component as props
  }
}