import { useSession } from 'next-auth/react'
import React from 'react'
import MiniProfile from './miniPorfile'
import Posts from './posts'
import Stories from './stories'
import SuggeStions from './suggestions'

export default function Feed() {
  const {data : session} = useSession()
  return (
    <main className={`container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:max-w-3xl xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
      
        <section className="col-span-2">             
            <Stories />
           <Posts />
        </section>

       {session && 
           <section className="hidden lg:col-span-1 xl:inline-grid">
           <div>
           <MiniProfile />
         <SuggeStions />
           </div>
         </section>
       } 
       
       
    </main>
  )
}
