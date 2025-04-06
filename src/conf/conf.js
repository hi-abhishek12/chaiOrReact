const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    projectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    dataBaseId: String(import.meta.env.VITE_APPWRITE_DATABASEID),
    collectionId : String(import.meta.env.VITE_APPWRITE_COLLECTIONID),
    bucketId : String(import.meta.env.VITE_APPWRITE_BUCKETID),


}
export default conf;