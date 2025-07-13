import config from "../config/config";
import { Databases, Client, ID, Query } from "appwrite";

export class ComentsService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);

    this.databases = new Databases(this.client);
  }

  async createComments({ userId, postId, avatarImage, content, name }) {
    try {
      const addComment = await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCommentCollectionId,
        ID.unique(),
        {
          postId,
          userId,
          avatarImage,
          content,
          name
        }
      );

      return addComment;
    } catch (error) {
      console.log("add comment error", error);
      return null;
    }
  }

  async getUserComments(postId) {
    try {
      return await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCommentCollectionId,
        [Query.equal("postId", [postId])]
      );
    } catch (error) {
      console.error("Fetch Comments Error", error);
      return [];
    }
  }

  async deleteComent(comentId){
    try {
        this.databases.deleteDocument(
            config.appWriteDatabaseId,
            config.appWriteCommentCollectionId,
            comentId
        )
        return true
    } catch (error) {
        console.log("error delete comment", error);
        
    }
  }
}

const commentsService = new ComentsService();
export default commentsService;
