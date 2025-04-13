import React, { use } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import appwriteSerive from '../../appwrite/config'
import {Button , Input , Select , RTE} from '../index'

function PostForm(post) {
  const navigate = useNavigate();
  const {register , handleSubmit , watch , setValue , control,
    getValues} = useForm({
      defaultValues: {
        title : post?.title || '',
        slug : post?.slug || '',
        content : post?.content || '',
        status : post?.status || ''
      }
    })
   const userData = useSelector((state) => state.auth.status);
   
  return (
    <div>PostForm</div>
  )
}

export default PostForm