import React , {useState}from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authservice from '../appwrite/auth'
import {Input , Button , Logo} from './index'
import { login as authLogin} from '../store/authSlice'
import {Link , useNavigate} from 'react-router-dom'

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error , setError] = useState('');
    const {register , handleSubmit} = useForm();

     const signUp = async(data) =>{
      setError('');
      try {    
        const account = await authservice.createAccount(data);
        if(account){
          const userData = await authservice.getCurrentUser()
          if(userData){
            dispatch(authLogin(userData));
            navigate('/')
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
  
      <h2 className="text-center text-2xl font-bold text-gray-800">Create your account</h2>
  
      <p className="mt-2 text-center text-sm text-gray-500">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
  
      {error && (
        <p className="text-red-600 mt-6 text-center text-sm font-medium">
          {error}
        </p>
      )}
  
      <form onSubmit={handleSubmit(signUp)} className="mt-8 space-y-6">
        <Input
          label="Full Name:"
          placeholder="Enter Full Name"
          {...register("name", {
            required: true,
          })}
        />
  
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
  
        <Button
          type="submit"
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Sign Up
        </Button>
      </form>
    </div>
  </div>
  
    
  )
}

export default SignUp