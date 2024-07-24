import conf from "../conf/conf"
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { Client, ID, Databases, Storage, Query, Flag } from "appwrite"
nprogress.configure({ easing: 'ease', showSpinner: true});
import { toast } from "react-toastify";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // API Endpoint
            .setProject(conf.appwriteProjectId); // Project ID

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }


    async createPost({title, slug, content, featuredImage, status, userId}){
        nprogress.start()
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                slug, // documentId
                {// data
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }, 
            );
        } catch (error) {
            throw error;
        } finally{
            nprogress.done()
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        nprogress.start()
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw error;
        } finally{
            nprogress.done()
        }
    }

    async deletePost(slug){
        nprogress.start()
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            throw error
            return false;
        } finally{
            nprogress.done()
        }
    }

    async getPost(slug){
        nprogress.start();
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )

        } catch (error) {
            throw error;
            // return false;
        } finally{
            nprogress.done()
        }
    }

    async getAllPost(queries = [Query.equal("status", 'active')]){
        nprogress.start()
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                queries // queries (optional)
            );
            
        } catch (error) {
            throw error
        }finally{
            nprogress.done()
        }
    }

    
    // file upload service

    async uploadFile(file){
        nprogress.start()
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            toast.error(`Unable to upload file: ${error.message} `)
            return false;
        } finally{
            nprogress.done()
        }
    }

    async deleteFile(fileId){
        nprogress.start()
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId, // bucketId
                fileId // fileId
            );
            return true;
        } catch (error) {
            toast.error(`Unable to delete file: ${error.message}`)
            return false;
        } finally{
            nprogress.done()
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }
}

const service = new Service();

export default service