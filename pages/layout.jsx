import React, { useState } from "react";
import Create from "./components/create";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import userContext from "./userConext";
import {parseCookies} from 'nookies'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

export default function Layout({ children }) {
  const [model, setModel] = useState(false)
  const cookie = parseCookies()
  const user = cookie.user ? JSON.parse(cookie.user) : ""
  return (
    <>
    <ToastContainer /> 
      <userContext.Provider value={{model, setModel, toast}}>
        <Create />

        <div className="grid grid-cols-12">
          {user && <div className=" col-span-2   border-r  border-gray-400">
            <Navbar />
          </div>}
          
          <div className= {user ? " col-span-10 overflow-y-auto h-screen " : " col-span-12"}>
            {children}
          </div>
        </div>
      </userContext.Provider>
    </>
  );
}
