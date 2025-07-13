import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import appwriteService from "../appwrite/database"
import PostCard from "../PostCard"
import { Container } from "../container/Container"
import config from '../config/config'
import { Query } from 'appwrite'

const Profile = () => {
  const userData = useSelector((state) => state.auth.userData)
  const [userPosts, setUserPosts] = useState([])
  const [avatarUrl, setAvatarUrl] = useState(null)

useEffect(() => {
  if (!userData || !userData.$id) {
    console.warn("userData not ready yet");
    return;
  }

  const fetchProfileAndPosts = async () => {
    try {
     
      const posts = await appwriteService.getUserPosts(userData.$id);
      setUserPosts(posts.documents);


      const profileRes = await appwriteService.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteUserProfileId,
        [Query.equal("userId", [userData.$id])]
      );

      if (profileRes.total === 0) {
        console.warn("No profile document found for this user.");
        return;
      }

      const profile = profileRes.documents[0];

     
      if (profile.avatarImage) {
        const previewUrl = appwriteService.getFileView(profile.avatarImage);
        setAvatarUrl(previewUrl);
      } else {
        console.warn("No avatar image found in profile.");
      }
    } catch (error) {
      console.error("Failed to fetch profile avatar:", error);
    }
  };

  fetchProfileAndPosts();
}, [userData]);



  return (
    <Container>
      <div className="py-8">
        {
          userData ? (<div className="flex items-center space-x-4 mb-6 bg-white md:p-10 p-5 rounded-xl">
          <img
            src={avatarUrl || "https://ui-avatars.com/api/?name=User"}
            alt="avatar"
            className="w-50 h-50 rounded-full object-cover object-top"
          />
          <div>
            <h2 className="text-[50px] font-semibold">{userData?.name || "Name not Found" }</h2>
            <p className="text-lg text-gray-500">{userData?.email  || "email not Found"}</p>
          </div>
        </div>)
         : (
          <div className="div">
            <h1 className='text-xl font-bold mb-4 text-center'>Please Login</h1>
          </div>
        )
      }

        <h3 className={`text-xl font-bold mb-4 ${userData ? "text-left" : "text-center"}`}>{userData ? "Your Posts" : "to See The Posts"}</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {userPosts.map((post) => (
            <div key={post.$id} className="md:w-1/3 w-full">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Profile
