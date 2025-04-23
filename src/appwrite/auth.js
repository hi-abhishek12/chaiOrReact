import {Client , Account ,ID} from 'appwrite';
import  conf  from '../conf/conf'

export class AuthService {
    client = new Client()
    account;
    constructor(){
        console.log(import.meta.env.VITE_APPWRITE_DATABASEID)
        console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID)
        this.client.
        setEndpoint(conf.appwriteUrl).
        setProject(conf.appwriteProjectId)
        
        this.account = new Account(this.client);
    }

    async createAccount({email , password , name}){
        try {
            const userAccount = await this.account.create
            (ID.unique(),email,password,name);

            if(userAccount){
                return this.login({email , password});
            }
            else{
                return null
            }

        } catch (error) {
            throw error
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
           return await this.account.get();
        } catch (error) {
            console.log(`throw error:`,error)
        }
        return null;
    }
    
    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log(`throw error:`,error)         
        }
    }
    
}


const authservice = new AuthService()

export default authservice;