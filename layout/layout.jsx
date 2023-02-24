import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userContext from "@/components/userContext";

export default function Layout({ children }) {
  
  return (
    <>
    <ToastContainer /> 
    <userContext.Provider value={{toast}}>      
        {children}
    </userContext.Provider>
      
    </>
  );
}
