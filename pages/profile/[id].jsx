import Image from 'next/image'
import React, { useContext } from 'react'
import {MdDelete} from 'react-icons/md'
import {parseCookies} from 'nookies'
import Cookies from 'js-cookie'
import Link from 'next/link'
import BaseUrl from '@/helpers/baseUrl'
import userContext from '../userConext'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

export default function Users({data, error}) {  
  const router = useRouter() 
  const {model, setModel} = useContext(userContext)
  const loaders = ({src}) => {
    return `https://res.cloudinary.com/dfgnwxo3b/image/upload/${src}`
  }
  const {token} = parseCookies()
  const cookie = parseCookies()
  const user = cookie.user ? JSON.parse(cookie.user) : ""

  if(error){
    Cookies.remove('user')
    Cookies.remove('token')
    router.push('/accounts/login')
    toast(error)
  }

  const deleteHandler = async (pid) => {
    const res = await fetch(`${BaseUrl}/api/postRouter/${pid}`,{
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : token
      }      
    })
    const res2 = await res.json()
    toast(res2.message)
    router.push(`/profile/${data.user._id}`)
  }

  

  let followBtn = data.user.followers.some(item => item._id == user._id)

  const followers = async (followId) => {
    const res = await fetch(`${BaseUrl}/api/followers`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : cookie.token
      },
      body : JSON.stringify({
        followId
      })
    })
    await res.json()
    router.push(`/profile/${data.user._id}`)
  }

  const unFollowers = async (followId) => {
    const res = await fetch(`${BaseUrl}/api/unfollowers`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : cookie.token
      },
      body : JSON.stringify({
        followId
      })
    })
    await res.json()
    router.push(`/profile/${data.user._id}`)
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-12 items-start gap-5 py-5 border-b border-gray-400">
          <div className="col-span-3">
            <Image loader={loaders}  src={data.user.ppic} width={130} height={130} alt="local" className="rounded-full w-32 h-32 object-cover" />
          </div>
          <div className="col-span-9">
            <div className="flex items-center gap-5">
              <h1 className="text-2xl capitalize">{data.user.name}</h1>
             {user._id == data.user._id && <Link href="/editprofile/[id]" as={`/editprofile/${data.user._id}`} className="px-5 rounded py-1 bg-gray-300 text-gray-900">Edit Profile</Link>}
             {user._id !== data.user._id && <div>
              {followBtn ? <button className="px-5 rounded py-1 text-gray-900 font-medium bg-gray-400" onClick={() => unFollowers(data.user._id)}>Unfollow</button> :  <button className="px-5 rounded py-1 text-gray-300 font-medium bg-green-900" onClick={() => followers(data.user._id)}>Follow</button>}
              
                            
             </div>} 
            </div>
            <div className="grid grid-cols-4 py-5">
              <p><span className="font-medium">{data.post.length}</span> posts</p>
              <p><span className="font-medium">{data.user.followers.length}</span> followers</p>
              <p><span className="font-medium">{data.user.following.length}</span> following</p>
            </div> 
            <div>
               <p>{data.user.email}</p>
               <Link href="/">www.fiverr.com/shahjalalk</Link>
              </div>           
          </div>
      </div>
      {data.post.length == 0 ? 
      <div className="text-center h-96 items-center flex justify-center space-y-3 flex-col">
        <h1 className="text-5xl">Post Not Found</h1>
        <button className="text-xl px-7 py-1 bg-slate-600 text-white" onClick={() => setModel(!model)}>Create a new Post</button>
      </div> : <div className="py-5 grid grid-cols-3 gap-5">
        {data.post.map((item) => {
          return(
            
            <div className=" relative group" key={item._id}>
             {user._id == data.user._id && <button className=" absolute top-0 right-0 z-10 text-2xl text-red-100 hidden group-hover:block" onClick={() => deleteHandler(item._id)}><MdDelete /></button>} 
              <Link href="/" as={`/#${item._id}`}>
              <div className=" absolute top-0 left-0 w-full h-full content-[''] bg-black/75 transition-all ease-in hidden group-hover:block "></div>
              <Image loader={loaders} src={item.photo} alt={item.title} width="350" height={350} className="w-full h-52 object-contain" /> 
              </Link>    
              
          </div>
               
          )
        })}
       
        
      </div>}
      
      
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx)
  const user = cookie.user ? JSON.parse(cookie.user) : ""
  // if(!cookie.token){
  //     const {res} = ctx
  //     res.writeHead(302, {location : "/accounts/login"})
  //     res.end()
  // }

  const res = await fetch(`${BaseUrl}/api/profile/${ctx.params.id}`, {
    headers : {      
      "Authorization" : cookie.token
    }
  })
  const data = await res.json()
  if(data.error){
    return {
      props: {
        error : data.error 
      },
    }
  }
  return {
    props: {
      data 
    }, // will be passed to the page component as props
  }
}