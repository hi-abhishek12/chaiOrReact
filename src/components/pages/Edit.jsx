import React , {useState , useEffect, use}from 'react'
import appwriteservice from '../../appwrite/config'
import { useNavigate , useParams } from 'react-router-dom'
import { PostForm } from '../post-form/PostForm';
import Container from '../container/container';

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