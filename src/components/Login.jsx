import React , {useState}from 'react'
import authservice from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login as authLogin} from '../store/authSlice'
import {Link , useNavigate} from 'react-router-dom'
import {useForm , submitHandler} from 'react-hook-form'

const dispatch = useDispatch();
const navigate = useNavigate();
const {registor , submitHandler} = useForm
const [error , setError] = useState('');

function Login() {
  return (
    <div>Login</div>
  )
}

export default Login