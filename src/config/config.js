const config = {
    
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionsId: String(import.meta.env.VITE_APPWRITE_COLLECTIONS_ID),
    appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appWriteUserProfileId: String(import.meta.env.VITE_APPWRITE_USER_PROFILE_ID),
    appWriteUserDocumentId: String(import.meta.env.VITE_APPWRITE_USER_Document_ID),
    appWriteCommentCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID),
    appWriteLikeCollectionId: String(import.meta.env.VITE_APPWRITE_LIKE_COLLECTION_ID)



}

export default config;