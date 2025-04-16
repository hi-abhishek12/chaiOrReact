import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteservice from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';


function Edit() {
    const [post , setPost] = useState([]);
    const navigate = useNavigate();
    const {slug} = useParams();

    useEffect((slug) =>{
        if(slug){
            appwriteservice.getPost(slug).then((post) =>{
                if(post){
                    setPost(post);
                }
            })
        }else{
            navigate('/');
        }
    },[navigate , slug])
  return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
           
        </div>
  ) : null
}

export default Edit