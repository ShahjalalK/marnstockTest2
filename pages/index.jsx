import Feed from '@/components/feeds/feed'
import Header from '@/components/header'
import Modal from '@/components/modal'
import React from 'react'

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Modal />
      {/* Headers */}
      <Header />
     
      {/* Feeds */}
      <Feed />
      {/* Model */}
      
    </div>
  )
}
