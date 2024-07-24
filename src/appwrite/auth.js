import conf from "../conf/conf";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { Client, Account, ID, Avatars } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    avatars;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // API Endpoint
            .setProject(conf.appwriteProjectId); // Project ID

        this.account = new Account(this.client)
        this.avatars = new Avatars(this.client)
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
            throw error
        } finally {
            nprogress.done()
        }
    }

    async login({ email, password }) {
        nprogress.start()
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
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
            throw error
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
            throw error
        } finally {
            nprogress.done()
        }

    }

    getInitialAvatar(username) {
        return this.avatars.getInitials(username)
    }

}

// Handle errors and show appropriate toast notifications
// const handleError = (error) => {
//     let errorMessage = 'An unknown error occurred';

//     if (error.response) {
//         errorMessage = error.response.data.message;
//     } else if (error.message) {
//         errorMessage = error.message;
//     }

//     // Display toast notification
//     toast.error(`Error: ${errorMessage}`);

//     // Optionally log errors to the console based on error type or severity
//     // if (shouldLogError(error)) {
//     //     console.error('Error:', error);
//     // }
// };

const authService = new AuthService()

export default authService