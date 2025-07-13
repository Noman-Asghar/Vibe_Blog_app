import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import appwriteService from './appwrite/database';
import ComentPage from './Coment';
import LikePage from './LikePage';

const PostCard = ({ $id, title, userName, content, featuredImage, postId, userId }) => {
  const [isHide, setIsHide] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handlecommentToggle = () => {
    setIsHide(!isHide);
  };

  
  useEffect(() => {
    if (userId) {
      appwriteService.getUserProfile(userId).then((profile) => {
        if (profile?.avatarImage) {
          const imageUrl = appwriteService.getFileView(profile.avatarImage);
          setUserProfile({ avatarUrl: imageUrl });
        }
      });
    }
  }, [userId]);

  const imageUrl = appwriteService.getFileView(featuredImage);

  return (
    <>
      <Link to={`/post/${$id}`}>
        <div className="py-3  px-4 flex items-center gap-4 rounded-t-2xl bg-gray-300">
          {userProfile?.avatarUrl && (
            <img
              src={userProfile.avatarUrl}
              alt="User Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <h1 className="text-xl text-gray-700 font-semibold">{userName}</h1>
        </div>

        <div className="w-full bg-gray-100 p-4">
          <div className="w-full flex justify-center mb-4">
            {imageUrl ? (
              <img src={imageUrl} alt={title} className="rounded-xl" />
            ) : (
              <p className="text-gray-500 text-center">Image not available</p>
            )}
          </div>

          <h2 className="text-xl font-bold">{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </Link>

      <div
        className={`flex justify-around py-4 items-center text-xl font-bold transition-all bg-gray-300 ${
          isHide ? 'rounded-none border border-gray-400' : 'rounded-b-2xl'
        }`}
      >
        <LikePage postId={$id} />
        <p onClick={handlecommentToggle}>Comments</p>
        <p>Share</p>
      </div>

      <div className={`bg-gray-300 ${isHide ? 'block' : 'hidden'}`}>
        <ComentPage postId={$id} />
      </div>
    </>
  );
};

export default PostCard;
