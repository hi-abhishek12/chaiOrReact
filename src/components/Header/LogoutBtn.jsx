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
    <button
    className="inline-block px-5 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
    onClick={logoutHandler}
  >
    Logout
  </button>
  
  )
}

export default LogoutBtn