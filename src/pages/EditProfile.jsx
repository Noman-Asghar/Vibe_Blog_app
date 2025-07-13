import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/database'
import config from '../config/config'
import { Query } from 'appwrite'
const EditProfile = () => {
  const userData = useSelector((state) => state.auth.userData)
  // console.log("userData",userData);
  
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

const handleUpload = async () => {
  if (!file) return alert("Please select an image");

  setLoading(true);

  try {
    if (!userData || !userData.$id) {
      alert("User not logged in properly.");
      setLoading(false);
      return;
    }

    const uploadedFile = await appwriteService.fileUpload(file);
    const avatarImageId = uploadedFile.$id;

    const profileResult = await appwriteService.databases.listDocuments(
      config.appWriteDatabaseId,
      config.appWriteUserProfileId,
      [Query.equal("userId", [userData.$id])]
    );

    if (profileResult.total === 0) {
      // Create profile document if not exists
      await appwriteService.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteUserProfileId,
        userData.$id, // You can use ID.unique() instead
        {
          userId: userData.$id,
          avatarImage: avatarImageId,
          
        }
      );
      alert("avatar uploaded!");
    } else {
      const profileDoc = profileResult.documents[0];
      await appwriteService.databases.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteUserProfileId,
        profileDoc.$id,
        {
          avatarImage: avatarImageId
        }
      );
      alert("Avatar updated successfully!");
    }

  } catch (err) {
    console.error("Error updating avatar:", err);
    alert("Something went wrong while updating avatar.");
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="md:max-w-md h-screen flex items-center justify-center mx-auto py-10 px-3">
     <div className='bg-amber-50 py-20 md:px-20 px-5 rounded-2xl'>
       <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 bg-gray-300 py-3 rounded-lg px-4"
        placeholder='Please select your profile image'
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Avatar"}
      </button>
     </div>
    </div>
  )
}

export default EditProfile
