import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'  
import authservice from '../../appwrite/auth'
import React from 'react'

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () =>{
        authservice.logout()
        .then(() =>{
            dispatch(logout())
        })
    }

  return (
    <button className='inline-block px-6 py-2 duration-200
     hover:bg-blue-100 rounded-full'>Logout</button>
  )
}

export default LogoutBtn