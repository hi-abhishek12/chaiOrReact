import React, { useCallback} from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import appwriteservice from '../../appwrite/config'
import {Button , Input , Select , RTE} from '../index'

function PostForm({post}) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  
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
        featuredImage : file ? file.$id : undefined,
        })
        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
      }else{
        const file = await appwriteservice.uploadFile(data.image[0])
        if(file){
          const fileId = file.$id
          data.featuredImage = fileId;

          const dbPost = await appwriteservice.createPost({
            ...data,
            userId : userData.$id,
            
          }
          
        )
        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }

        }
      }
    }

    const slugTransform = useCallback((value) =>{
        if(value && typeof(value) == 'string'){
          return value.trim().
          toLowerCase()
          .replace(/\s+/g, '-')   // replace spaces with dashes
          .replace(/[^a-z0-9\-]/g, '')  
          
        } else{ 
            return ''
          }
    },[])

    React.useEffect(() =>{
      const subscription = watch(( value , {name}) =>{
        if(name === 'title'){
          setValue('slug', slugTransform(value.title , 
            {shouldValidate : true}
          ))
        }
      })
      return () =>{
        subscription.unsubscribe()
      }
    },[watch , slugTransform , setValue])

   
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwriteservice.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
      <Button
      type="submit"
      bgColor={post ? "bg-green-500 hover:bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"}
      className="w-3/5 max-w-xs mx-auto text-white font-semibold rounded-md py-3 shadow-md
             transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
             focus:ring-indigo-500"
      >
      {post ? "Update" : "Submit"}
</Button>

    </div>
</form>

  )
}

export default PostForm