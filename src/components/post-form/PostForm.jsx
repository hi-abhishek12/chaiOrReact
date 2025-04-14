import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import appwriteservice from '../../appwrite/config'
import {Button , Input , Select , RTE} from '../index'
import authservice from '../../appwrite/config'

function PostForm(post) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.status);
  
  const {register , handleSubmit , watch , setValue , control,
    getValues} = useForm({
      defaultValues: {
        title : post?.title || '',
        slug : post?.slug || '',
        content : post?.content || '',
        status : post?.status || 'active'
      }
    })

    const submit = async(data) =>{
      if(post){
       const file =  data.image[0] ? await appwriteservice.
       uploadFile(data.image[0]) : null

       if(file){
        await appwriteservice.deleteFile(post.featuredImage)
       }
       
      const dbPost = await appwriteservice.updatePost(post.$id ,{
        ...data,
        featuredImage : file? file.$id : undefined,
        })
        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
      }else{
        const file = await authservice.uploadFile(data.image[0])
        if(file){
          const fileId = file.$id
          data.featuredImage = fileId;
          const dbPost = await authservice.createPost({
            ...data,
            userId : userData,
          }
        )
        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
        }
      }
    
    }



  return (
    <div>PostForm</div>
  )
}

export default PostForm