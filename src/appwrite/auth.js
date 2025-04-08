import {Client , Account ,ID} from appwrite;
import {conf }from '../conf.js'

export class AuthService {
    Client = new Client()
    account;
    constructor(){
        this.Client.
        setEndPoint(conf.appwriteUrl).
        setProject(conf.projectId)
        this.account = new Account(this.Client);
    }

    async createAccount({email , password , name}){
        try {
            const account = await this.account.create
            (ID.unique(),email,password,name);

            if(account){
                return account;
            }
            else{
                console.log('error');
            }

        } catch (error) {
            console.log(error);
        }
    }
    
}


const authservice = new AuthService()

export default authservice;