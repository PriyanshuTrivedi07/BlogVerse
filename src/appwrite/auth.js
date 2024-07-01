import conf from "../conf/conf";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // API Endpoint
            .setProject(conf.appwriteProjectId); // Project ID

        this.account = new Account(this.client)
    }


    async createAccount({ email, password, name }) {
        nprogress.start()
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name) //the order of parameters is important
            if (userAccount) {
                // call another method
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
        } finally {
            nprogress.done()
        }
    }

    async login({ email, password }) {
        nprogress.start()
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            // console.log("Appwrite service :: login :: error", error);
            throw error
        } finally {
            nprogress.done()
        }
    }

    async getCurrentUser() {
        nprogress.start();
        try {
            return await this.account.get();
        } catch (error) {
            // console.log("Appwrite service :: getCurrentUser :: error", error);
            // if (error.code === 401) {
            //     console.log('You are not logged in');
            //     // Display the message on the home page
            // } else {
            //     console.error('An unexpected error occurred:', error);
            // }
            throw error;
        } finally {
            nprogress.done()
        }

        return null;
    }

    async logout() {
        nprogress.start()
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        } finally {
            nprogress.done()
        }

    }
}

const authService = new AuthService()

export default authService