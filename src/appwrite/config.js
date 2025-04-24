import conf from '../conf/conf'
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
            console.log('appwrite service :: createPost :: error',error)
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
        console.log('appwrite service :: updatepost :: error',error)
    }
   }
   
   async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId , conf.appwriteCollectionId , slug
        )
        return true;
    } catch (error) {
        console.log('Appwrite :: deletePost ::verror',error)
        return false;
    }
   }

   async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId , 
            conf.appwriteCollectionId , 
            slug 
        )
    } catch (error) {
        console.log('Appwrite :: getPost ::verror',error);
        return false;
    }
   }

   async getPosts(){
        try {

            return  await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status" , "active")
                ]
            )
           
        } catch (error) {
            console.log('Appwrite :: getAllPosts :: error',error);
        }
   }


   // file upload service

   async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId , ID.unique(),
            file
        )
    } catch (error) {
        console.log('appwrite service :: upload file error :: ',error);
        return false;
    }
   }

   async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId , fileId
        )
        return true
    } catch (error) {
        console.log('appwrite service :: deleteFile :: error',error);
        return false;
    }
   }
   
   getFilePreview = (fileId) =>{
        try {
           
            return this.bucket.getFilePreview(
                conf.appwriteBucketId , fileId
            )
        } catch (error) {
            console.log('appwrite service :: getFilePreview :: error',error);
        }
   }
 
}

const service = new Service();
export default service;