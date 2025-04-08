import {client , Account ,ID} from appwrite;
import {conf }from '../conf.js'

export class AuthService {
    client = new client()
    account;
    constructor(){
        this.client.
        setEndPoint(conf.appwriteUrl).
        projectId(conf.projectId)
        this.account = new Account(this.client);
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

export default auth;