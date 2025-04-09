import conf from '../conf.js'
import { Databases , Query , ID , Storage , Client } from 'appwrite'

class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
  
    this.client
     .setEndpoint(conf.appwriteUrl)
     .setProject(conf.appwriteProjectId)
     this.databases = new Databases(this.client)
     this.bucket = new Storage(this.client)
    }
    
    
   async createPost({title , slug , content , status , featuredImage , userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId , slug , {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
            })
        } catch (error) {
            console.log('error',error)
        }
   } 

   async updatePost(slug , {title , content , status , featuredImage }){
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId , conf.appwriteCollectionId, slug ,{
                title,
                content,
                status,
                featuredImage 
            }
        )
    } catch (error) {
        throw error;
    }
   }
   
   async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId , conf.appwriteCollectionId , slug
        )
        return true;
    } catch (error) {
        console.log('error',error)
        return false;
    }
   }

   async getPost(slug){
    try {
         await this.databases.getDocument(
            conf.appwriteDatabaseId , 
            conf.appwriteCollectionId , 
            slug 
        )
    } catch (error) {
        console.log('error',error);
    }
   }
}

const service = new Service();
export default service;