import { ModalState } from "@/atoms/modalato";
import React, { Fragment, useRef, useState } from "react";
import { Snapshot, useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import ImageLoader from "./imgLoader";
import { db, storage } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";

export default function Modal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(ModalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const addImgPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      userName : session.user.name,
      caption,
      profileImg : session.user.image,
      timeStamp : serverTimestamp()
    })

    console.log(docRef.id)

  const imageRef = ref(storage, `posts/${docRef.id}/image`)
  uploadBytes(imageRef, selectedFile).then(() =>{
     getDownloadURL(imageRef).then((item) => {

      updateDoc(doc(db, "posts", docRef.id), {
      images : item
    })

    })
   
    
   
  })

    setOpen(false);
    setCaption("")
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        onClose={() => setOpen(false)}
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-end min-h-[800px] sm:minmin-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <span
            className=" hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full  sm:p-6">
              <div>
                {selectedFile ? (
                  <label htmlFor="imgPost" className=" cursor-pointer">
                    {selectedFile && (
                      <Image
                        src={
                          selectedFile ? URL.createObjectURL(selectedFile) : ""
                        }
                        className="w-full"
                        alt="sssn"
                        loader={ImageLoader}
                        width={0}
                        height={0}
                      />
                    )}
                  </label>
                ) : (
                  <label
                    className="flex mx-auto items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                    htmlFor="imgPost"
                  >
                    <AiFillCamera
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </label>
                )}

                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 text-center"
                  >
                    Upload a photo
                  </Dialog.Title>
                </div>
                <div>
                  <input
                    type="file"
                    id="imgPost"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    hidden
                  />
                </div>
                <div className="mt-2">
                  <input
                    className="border-none focus:ring-0 w-full text-center"
                    type="text"
                    placeholder="Please enter a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className=" inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    disabled={!selectedFile}
                    onClick={addImgPost}
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
