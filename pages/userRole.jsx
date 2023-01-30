import baseUrl from '@/helpers/baseUrl'
import React, { useEffect, useState } from 'react'
import {parseCookies} from 'nookies'

export default function UserRole() {
    const [users, setUsers] = useState([])   
    const {token} = parseCookies()
    useEffect(() => {
        fetchUser()        
    }, [users])
    const fetchUser = async () => {
        const res = await fetch(`${baseUrl}/api/users`, {
            headers : {
                "Authorization" : token
            }
        })
        const res2 = await res.json()
        setUsers(res2)
    }
    const handleRole = async (role, _id) => {
        const res = await fetch(`${baseUrl}/api/users`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : token
            },
            body : JSON.stringify({
                role,
                _id 
            })
        })
         await res.json()       
           
    }
  return (
    <div className="max-w-2xl mx-auto py-5">
        <h1 className="text-center text-5xl mb-3">User Role</h1>
       <table className="w-full text-center table-auto">
        <thead>
            <tr>
                <td className="border border-gray-900">Name</td>
                <td className="border border-gray-900">Email</td>
                <td className="border border-gray-900">Role</td>
            </tr>
        </thead>
        <tbody>
            {users.map((item, index) => {
                return(
                    <tr key={index}>
                        <td className="border border-gray-900">{item.name}</td>
                        <td className="border border-gray-900">{item.email}</td>
                        <td className="border border-gray-900" onClick={() => handleRole(item.role, item._id)}>{item.role}</td>                       
                    </tr> 
                )
            })}
        
        </tbody>
       </table>
    </div>
  )
}
