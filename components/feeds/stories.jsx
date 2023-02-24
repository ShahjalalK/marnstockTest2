import React, { useState, useEffect } from "react";
import Story from "./story";
const { faker } = require("@faker-js/faker");
import userContext from "../userContext";
import { useSession } from "next-auth/react";

export default function Stories() {
  const {data : session} = useSession()
  
  const sagetion = [...Array(20)].map((item, index) => {
    const _id = faker.datatype.uuid();
    const avatar = faker.image.avatar();
    const birthday = faker.date.birthdate();
    const email = faker.internet.email();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const sex = faker.name.sexType();
    return { _id, avatar, birthday, email, firstName, lastName, sex };
  });

  return (
    <div className="w-full overflow-x-scroll mt-5 scrollbar-thin scrollbar-thumb-black">
      <div className="flex items-center gap-2 p-3">       
          
           {session && <Story _id={faker.datatype.uuid()} avatar={session?.user.image} firstName={session?.user.name} lastName="" />} 
         
        {sagetion.map((item) => {
          const { _id, avatar, firstName, lastName } = item;
          return (
            
              <Story  _id ={_id}  avatar ={avatar} firstName ={firstName} lastName={lastName} />
            
          );
        })}
      </div>
    </div>
  );
}
