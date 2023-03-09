import React, { useEffect, useState } from 'react'
import Post from './post'
import userContext from '../userContext'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
const Posted =[ {
  id : "123",
  userName : "ShahjalalK",
  userImg : "/profile2.jpg",
  img : "https://links.papareact.com/3ke",
  caption : "Awesome Shahjalal You are luck good"
},
{
  id : "123",
  userName : "ShahjalalK",
  userImg : "/profile2.jpg",
  img : "https://links.papareact.com/3ke",
  caption : "Awesome Shahjalal You are luck good"
},
{
  id : "123",
  userName : "ShahjalalK",
  userImg : "/profile2.jpg",
  img : "https://links.papareact.com/3ke",
  caption : "Awesome Shahjalal You are luck good"
}
]

export default function Posts() {
  const [posts, setPosts] = useState([])

  console.log(posts)
 

  useEffect(() => {


  onSnapshot(collection(db, "posts"), orderBy('timestamp', 'desc'), (snapshot) => {
    setPosts(snapshot.docs.map((item) => {
      return {...item.data(), id:item.id}
    }))
  })

 
   
  }, [])

  return (
    <div>
      {posts.map((item) => {
        return(
          <div key={item.id}>
            <userContext.Provider value={{item}}>
              <Post />
          </userContext.Provider>
          </div>
        )
      })}
            
    </div>
  )
}
