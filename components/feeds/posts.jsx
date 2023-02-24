import React from 'react'
import Post from './post'
import userContext from '../userContext'
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
  return (
    <div>
      {Posted.map((item) => {
        return(
          <userContext.Provider value={{item}}>
              <Post />
          </userContext.Provider>
        )
      })}
            
    </div>
  )
}
