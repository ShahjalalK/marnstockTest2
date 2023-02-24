import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import ImageLoader from "../imgLoader";

export default function SuggeStions() {
  const [saggestions, setSaggestions] = useState([]);

  useEffect(() => {
    const saggestions = [...Array(6)].map((item) => {
      return {
        _id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        companyName : faker.company.companyName()
      };
    });

    setSaggestions(saggestions);
    
  }, []);

  
  return (
    <div className="mt-4 ml-10">
      <div className="flex items-center justify-between">
        <h3>Suggestion for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      <div className="flex flex-col space-y-3 mt-5">
        {saggestions.map((profile) => {
          return(
            <div key={profile._id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
              <Image loader={ImageLoader} src={profile.avatar} width={50} height={50} alt="ask" className="w-10 h-10 rounded-full border object-cover p-[2px]" />
              <div>
                <h2 className=" font-semibold text-sm">{profile.firstName}</h2>
                <p className="text-gray-400 text-xs">Work at {profile.companyName}</p>
              </div>              
              </div>
              <button className="text-sm text-blue-400">Follow</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
