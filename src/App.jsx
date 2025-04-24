import './App.css' 
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import  authservice from './appwrite/auth';
import { Header,Footer } from './components';
import {login , logout} from './store/authSlice'

function App() {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    authservice.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => (setLoading(false)))
  },[])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gradient-to-b from-gray-100 via-gray-50 to-white">
  <div className="w-full">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
</div>


  ): null
}

export default App
