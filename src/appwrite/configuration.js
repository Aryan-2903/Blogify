import config from "../config/config";
import {Client,ID, Databases, Storage,Query} from "appwrite";

export class Service{
  client = new Client();
  databases;
  bucket;

  constructor(){
    this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId)
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({title, slug, content, featuredImage, status, userId}){
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      )

    } catch (error) {
      console.log("appwrite service :: createAcount::error",error);
      
    }

  }
  //slug is the document id here

  async updatePost(slug,{title, content, featuredImage, status}){
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title, content, featuredImage, status,
        }
      )
      
    } catch (error) {
      console.log("appwrite service::updatePost::error",error);
      
    }

  }

  async deletePost(slug){
    await this.databases.deleteDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      slug
    )
    return true;
  }

  async getPost(slug){
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      )
      
    } catch (error) {
      console.log("appwrite service::getPost::error",error);
      return false;
      
    }

  }

  async getPosts(queries =[Query.equal("status","active")]){
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries,
      )
      
    } catch (error) {
      console.log("appwrite service::getPosts::error",error);
      return false;
    }
  }

  //file upload service
  async uploadFile(file){
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      )
      
    } catch (error) {
      console.log("appwrite service::upload file::error",error);
    }
  }

  //delete file
  async deleteFile(fileId){
    try {
      await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId
      )
      return true;
    } catch (error) {
      console.log("appwrite service::delete file::error",error);
      return false;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      config.appwriteBucketId,
      fileId
    )
  }


}

export const service = new Service();

export default service;