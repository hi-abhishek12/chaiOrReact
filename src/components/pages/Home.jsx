import React , {useState , useEffect} from 'react'
import appwriteservice from '../../appwrite/config'
import {Container , PostCard} from '../index'
function Home() {
    const [posts, setpost] = useState([])
    useEffect(() =>{
       appwriteservice.getPosts().then((posts) =>{
        if(posts){
            setpost(posts)
        }
       })
    })
 if(posts.length === 0){
    <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
    </div>
 }
 return(
    <div className='w-full py-8'>
        <Container>
           <div className='flex flex-wrap'>
            {posts?.map((post)=>{
                <div className='p-2 w-1/4' key={post.$id}>
                    <PostCard post={post}/>
                </div>
            })}
            </div>
        </Container>   
    </div>
 )
}

export default Home