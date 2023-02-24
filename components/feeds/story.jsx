import Image from "next/image";
import React, { useContext } from "react";
import userContext from "../userContext";
import ImageLoader from "../imgLoader";

export default function Story({_id, avatar, firstName, lastName}) {

  return (    
   
          <div key={_id} className="text-center">
            <div className="w-12 h-12 p-[2px] overflow-hidden border-red-500 border-2 rounded-full cursor-pointer hover:scale-110  transition transform duration-200">
              
              <Image
                src={avatar}
                alt={firstName}
                width={50}
                loader={ImageLoader}
                height={50}
                className="rounded-full w-full object-cover "
              />
            </div>
            <p className="text-xs w-14 truncate">
              {firstName + lastName}
            </p>
          </div>
       
    
  );
}
