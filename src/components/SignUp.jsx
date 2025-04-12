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
    const {registor , handleSubmit} = useForm();

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
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg
           bg-gray-100 rounded-xl p-10 border border-black/10`}>
             <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

        {error && <p className =
        "text-red-600 mt-8 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit(signUp)}>
          <div className='space-y-5'>
          <Input
            label = "Full Name:"
            placeholder = "Enter Full Name"
            {...registor("name",{
              required : true
            })}
          />

           <Input 
              label = "Email:"
              placeholder = "Enter Email"
                    type = "email"
              {...register("email",{
                required : true,
                validate : {
                  matchPattern:(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.
                    test(value) || 'Email address must be valid address'
                }
              })}
                />

            <Input
              label = "Password:"
              placeholder = "Enter Password"
              type = "password"
              {...required("password",{
                required : true
              })}
          />

          <Button type='submit'
          className='w-full'>
            Sign Up
          </Button>
          </div>
         
        </form>
        
        </div>
    </div>
    
  )
}

export default SignUp