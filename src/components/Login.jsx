import React , {useState}from 'react'
import authservice from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import {Logo , Input , Button} from './index'
import { login as authLogin} from '../store/authSlice'
import {Link , useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'

function Login() {

const dispatch = useDispatch();
const navigate = useNavigate();
const {register , handleSubmit} = useForm()
const [error , setError] = useState('');

const login = async(data) =>{
  setError('');
  try {
    const session = await authservice.login(data)
    if(session){
      const userData = await authservice.getCurrentUser()
      if(userData){
        dispatch(authLogin(userData))
        navigate("/");
      }
    }
  } catch (error) {
      setError(error.message)
  }
}
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-200">
      <div className="flex justify-center mb-4">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>
  
      <h2 className="text-center text-2xl font-bold text-gray-800">Sign in to your account</h2>
  
      <p className="mt-2 text-center text-sm text-gray-500">
        Don&apos;t have an account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-indigo-600 hover:underline"
        >
          Sign Up
        </Link>
      </p>
  
      {error && (
        <p className="text-red-600 mt-6 text-center text-sm font-medium">
          {error}
        </p>
      )}
  
      <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
        <Input
          label="Email:"
          placeholder="Enter Email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                "Email address must be valid",
            },
          })}
        />
  
        <Input
          label="Password:"
          placeholder="Enter Password"
          type="password"
          {...register("password", {
            required: true,
          })}
        />
  
        <Button type="submit" className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">
          Sign In
        </Button>
      </form>
    </div>
  </div>
  
  )
}

export default Login