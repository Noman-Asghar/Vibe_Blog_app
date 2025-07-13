import config from "../config/config"
import { Client, ID, Storage, Databases, Query } from "appwrite";


export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    content,
    featuredImage,
    status,
    slug,
    userId,
    userName
  }) {
    try {
      return await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionsId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
         userName
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionsId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }
async getUserPosts(userId) {
  if (!userId) return { documents: [] }; // 👈 Add this line to prevent null query

  try {
    return await this.databases.listDocuments(
      config.appWriteDatabaseId,
      config.appWriteCollectionsId,
      [Query.equal("userId", userId)]
    );
  } catch (error) {
    console.log("Error fetching user posts", error);
    return { documents: [] };
  }
}


  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionsId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

 async getPost(slug) {
  try {
    return await this.databases.getDocument(
      config.appWriteDatabaseId,
      config.appWriteCollectionsId,
      slug
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}


  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
       return  await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionsId,
        queries
      );
      // return true;
    } catch (error) {
      console.log(error);
      // return false;
    }
  }

  // File Upload Services

   async fileUpload(file){
        try {
            return await this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
                )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

getFileView(fileId) {
  try {
    if (!fileId) {
      console.warn("getFileView called without fileId");
      return null;
    }

    const result = this.bucket.getFileView(config.appWriteBucketId, fileId);
    const url = result.toString();
    // console.log("Download URL:", url);
    return url;
  } catch (error) {
    console.error("Error in getFileView:", error);
    return null;
  }
}

async getUserProfile(userId) {
  try {
    const response = await this.databases.listDocuments(
      config.appWriteDatabaseId,
      config.appWriteUserProfileId,
      [Query.equal("userId", [userId])]
    );
    return response.documents[0]; // First match
  } catch (error) {
    console.log("getUserProfile error", error);
    return null;
  }
}

}

const services = new Services();

export default services;
