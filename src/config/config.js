const config ={
  appwriteURL: String(import.meta.export.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.export.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.export.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.export.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.export.VITE_APPWRITE_BUCKET_ID),

}

export default config;