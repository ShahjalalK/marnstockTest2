import React, { useContext } from 'react'
import userContext from '../userContext'
import {HiOutlineDotsHorizontal} from 'react-icons/hi'
import {AiOutlineHeart} from 'react-icons/ai'
import {BiMessageSquareDetail} from 'react-icons/bi'
import {BsEmojiSmile} from 'react-icons/bs'
import {FaRegPaperPlane} from 'react-icons/fa'
import {GrBookmark} from 'react-icons/gr'
import Image from 'next/image'
import ImageLoader from '../imgLoader'

export default function Post() {
    const {item} = useContext(userContext)
  return (
    <div className="bg-white my-7 border rounded-sm">
       {/* Headers */}
       <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
        <div className="w-9 h-9 p-[1px] rounded-full overflow-hidden border-red-500 border">
        <Image loader={ImageLoader} src={item.userImg} alt="profile" width={350} height={350} className="w-full h-full rounded-full object-cover" />
        </div>
        <p>{item.userName}</p>
        </div>
        <HiOutlineDotsHorizontal className="text-3xl cursor-pointer" />
       </div>
       <Image loader={ImageLoader} src={item.img} width={350} height={350} alt="media" className="w-full object-cover" />
      <div className="flex items-center justify-between px-4 pt-4">
      <div className="flex space-x-4">
        <AiOutlineHeart className="btn" />
        <BiMessageSquareDetail className="btn" />
        <FaRegPaperPlane className="btn" />
       </div>
       <GrBookmark className="btn"/>
      </div>
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{item.userName}</span>
        {item.caption}
      </p>
      {/* Comments */}
      {/* input box */}
      <form className="flex items-center justify-between p-4">
        <div className="flex items-center">
        <BsEmojiSmile className="text-lg" />
        <input type="text" placeholder='Add a comment...' className="outline-none border-none focus:ring-0" />
        </div>
        
        <button className="text-blue-400">Post</button>
      </form>
    </div>
  )
}
