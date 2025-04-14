import React , { useState, useEffect }from 'react'
import {PostCard , Container }from '../index'
import appwriteservice from '../../appwrite/config'
function AllPosts() {
   const [posts , setPosts] = useState([]);
    useEffect(() => {
        appwriteservice.getPosts([])
        .then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    })
  return (
    <div className='w-full py-8'>
        <Container>
            
        </Container>
    </div>
  )
}

export default AllPosts