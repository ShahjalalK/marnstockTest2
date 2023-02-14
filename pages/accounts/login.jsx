import BaseUrl from '@/helpers/baseUrl'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import {parseCookies} from 'nookies'
import userContext from '../userConext'


export default function Login() {
    const {toast} = useContext(userContext)
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        const res = await fetch(`${BaseUrl}/api/login`, {
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
            setError(res2.error)
        }else{
            Cookies.set('user', JSON.stringify(res2.user))
            Cookies.set('token', res2.token)
            router.push("/")
            toast(res2.message)
        }
    }
  return (
    <>
      
    <div className="max-w-sm mx-auto bg-white border border-gray-300 py-5 my-5 select-none">
        <h1 className="text-4xl font-Lobster text-center">Instagram</h1>
       
        <div className="max-w-xs mx-auto py-5 ">  
        
            <form onSubmit={submitHandler}>
            <input type="email" placeholder='Email' className="w-full border outline-none rounded-1 p-1 text-sm bg-[#f1f1f1]" value={email} onChange={(e) => setEmail(e.target.value)} />             
            <input type="password" placeholder='password' className="w-full border outline-none rounded-1 p-1 text-sm bg-[#f1f1f1] mt-2" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <p className="text-red-500 text-sm">{error}</p>
            {email && password ? <button type='submit' className="p-1 bg-blue-500 text-sm mt-5 rounded-1 w-full text-white">Log in</button> : <button type='submit' disabled className="p-1 bg-blue-400 text-sm mt-5 rounded-1 w-full text-white">Log in</button>}            
            </form>
            <div className="my-5">                
                <table className="w-full">
                    <tr>
                    <td className="w-[42%]">
                            <div className="block border border-gray-300"></div>
                        </td>
                        <td className="w-[16%] text-center text-gray-400 font-medium">
                            OR
                        </td>
                        <td className="w-[42%]">
                        <div className="block border border-gray-300"></div>
                        </td>
                    </tr>
                </table>
                

              
            </div>
            <div className="text-center text-sm">
                <Link href="/">forgot password?</Link>
            </div>
        </div>
    </div>
    <div className="max-w-sm mx-auto bg-white border border-gray-300 py-5 my-5 select-none">
        <h1 className="text-sm text-center">Don't have an account? <Link href="/accounts/signup" className="text-blue-500">Sign up</Link></h1>             
    </div>
    </>
  )
}


export async function getServerSideProps(ctx) {
    const {token} = parseCookies(ctx)
    if(token){
        const {res} = ctx
        res.writeHead(302, {location : "/users"})
        res.end()
    }
    return {
      props: {}, // will be passed to the page component as props
    }
  }