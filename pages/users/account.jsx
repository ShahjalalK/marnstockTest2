import React from 'react'
import {parseCookies} from 'nookies'
import UserRole from '../userRole'

export default function Account() {
  const cookie = parseCookies()
  const user = cookie.user ? JSON.parse(cookie.user) : ""
  
  return (
    <>
    <div className='text-center text-5xl py-5'>
      <h1 className="text-center">Welcom to skMurch</h1>
    </div>

    {user.role === 'root' && <UserRole /> } 
    
    </>
  )
}


export async function getServerSideProps(ctx) {
  const {token} = parseCookies(ctx)
  if(!token){
    const {res} = ctx
    res.writeHead(302, {location : "/users/login"})
    res.end()
  }
  return {
    props: {}, // will be passed to the page component as props
  }
}