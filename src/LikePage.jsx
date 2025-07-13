import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import likeService from "./appwrite/like"

const LikePage = ({postId}) => {
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const userData = useSelector((state) => state.auth.userData)

useEffect(() => {
    likeService.getPostLike(postId).then((res) => {
        setLikeCount(res.documents.length)
    })

    if (userData) {
        likeService.hasUserLiked(postId, userData.$id).then(setLike)
    }
}, [postId, userData])


const handleLike = async () => {
  if (!userData) return;

  // console.log("User clicked like button. Current state:", like);

  if (like) {
    // console.log("Unliking post...");
    const success = await likeService.unlikePost(postId, userData.$id);
    if (success) {
      // console.log("Successfully unliked.");
      setLike(false);
      setLikeCount((prev) => prev - 1);
    } else {
      // console.log("Failed to unlike.");
    }
  } else {
    // console.log("Liking post...");
    const res = await likeService.likePost(postId, userData.$id);
    if (res) {
      // console.log("Successfully liked.");
      setLike(true);
      setLikeCount((prev) => prev + 1);
    } else {
      // console.log("Failed to like.");
    }
  }
};

  return (
    <div className="">
      <button
        onClick={handleLike}
        disabled={false}
      >
        {like ? "Liked ❤️" : "Like 🤍"} ({likeCount})
      </button>
    </div>
  )
}

export default LikePage