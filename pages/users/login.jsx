import baseUrl from '@/helpers/baseUrl'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Cookies from 'js-cookie'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [message, setMessage] = useState()
  

  const submitHandler = async(e) => {
    e.preventDefault()
    const res = await fetch(`${baseUrl}/api/users/login`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        email,
        password
      })
    })
    const res2 = await res.json()
    if(res2.error){
        setMessage(res2.error)
    }else{  
      Cookies.set('user', JSON.stringify(res2.user))
      Cookies.set('token', res2.token)
      router.push('/users/account')
    }
  }
  return (
    <div className="max-w-lg mx-auto bg-white p-5">
      <form onSubmit={submitHandler}>        
        <input type="email" placeholder="Email" className="w-full border rounded p-1 outline-none mt-5" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full border rounded p-1 outline-none mt-5" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <p className="mt-3 text-lg">{message}</p>
        <button type='submit' className='w-full text-lg p-1 bg-gray-500 text-gray-50 mt-5 rounded'>Submit</button>
      </form>
    </div>
  )
}
