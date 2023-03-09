import React, { useEffect, useState } from 'react'
import {storage} from '@/firebaseConfig'
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';

export default function TestFirebase() {
    const [imgUpload, setImgUpload] = useState(null)
    const [imageList, setImgList] = useState([])

    const uploadImg = () => {
        if(imgUpload == null) return

        const imgRef = ref(storage, `images/${imgUpload.name + uuidv4()}`)
        uploadBytes(imgRef, imgUpload).then(() => {
            const downloadUrl = getDownloadURL(imgRef)
            console.log(downloadUrl)
        })
    }
    // useEffect(() => {

    // })
  return (
    <div className="max-w-lg mx-auto border flex flex-col space-y-5">
        <input type="file" className="w-full border" onChange={(e) => setImgUpload(e.target.files[0])}  />
        <button type='button' onClick={uploadImg} className="px-7 py-1 bg-gray-800 text-white">Upload Image</button>
    </div>
  )
}
