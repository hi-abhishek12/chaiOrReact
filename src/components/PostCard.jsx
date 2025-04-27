import React from 'react'
import appwriteservice from '../appwrite/config'
import { Link } from 'react-router-dom' 

function PostCard({$id , title , featuredImage}) {
  return (
    <Link to = {`/post/${$id}`}>
       <div className="w-full bg-gray-50 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
  <div className="w-full flex justify-center mb-5">
    <div className="w-48 h-48 overflow-hidden rounded-xl">
      <img
        src={appwriteservice.getFilePreview(featuredImage)}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
  <h2 className="text-2xl font-semibold text-gray-900 truncate">{title}</h2>
</div>


    </Link>
  )
}

export default PostCard