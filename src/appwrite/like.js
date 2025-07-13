import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config";

export class LikeService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);

    this.databases = new Databases(this.client);
  }

  async likePost(postId, userId) {
    try {
      const like = await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteLikeCollectionId,
        ID.unique(),
        { postId, userId }
      );

      return like;
    } catch (error) {
      console.log("like post error", error);
    }
  }

  async getPostLike(postId) {
    try {
      const getLikes = await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteLikeCollectionId,
        [Query.equal("postId", postId)]
      );
      return getLikes;
    } catch (error) {
      console.log("get like error", error);
    }
  }

  async hasUserLiked(postId, userId) {
    try {
      const result = await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteLikeCollectionId,
        [Query.equal("postId", postId), Query.equal("userId", userId)]
      );
      return result.documents.length > 0;
    } catch (error) {
      console.error("Error checking like:", error);
      return false;
    }
  }
async unlikePost(postId, userId) {
  try {
    const result = await this.databases.listDocuments(
      config.appWriteDatabaseId,
      config.appWriteLikeCollectionId,
      [
        Query.equal("postId", postId),
        Query.equal("userId", userId)
      ]
    );

    if (result.documents.length > 0) {
      const likeDocId = result.documents[0].$id;

      await this.databases.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteLikeCollectionId,
        likeDocId
      );

      return true;
    }

    return false;
  } catch (error) {
    console.error("Error unliking post:", error);
    return false;
  }
}

}

const likeService = new LikeService();
export default likeService;
