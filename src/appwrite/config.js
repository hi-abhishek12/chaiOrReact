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
            
        }
   } 
}


const service = new Service();
export default service;