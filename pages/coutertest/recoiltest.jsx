import React, { useState } from 'react'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import CounterBtn from './counterbtn'
import { countState, histryState } from './countState'




export default function RecoilTest() {

  const [count, setCount] = useRecoilState(countState)
  const history = useRecoilValue(histryState)
 
  
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <h1 className="text-xl">My Number is {count} </h1>
      <CounterBtn />
      <div>
        <ul>
          {history.map((item, index) => {
            console.log(item)
            return<li key={index} className="list-disc">{item}</li>
          })}
          
        </ul>
      </div>
    </div>
  )
}
