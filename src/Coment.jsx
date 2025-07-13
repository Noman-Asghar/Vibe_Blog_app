import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import comentService from "./appwrite/coments"
import appwriteService from "./appwrite/database"

const ComentPage = ({postId}) => {

    const  [coments, setComents] = useState([])
    const [newComent, setNewComent] = useState("")
    const [userProfile, setUserProfile] = useState(null);

    const userData = useSelector((state) => state.auth.userData)
    
// console.log("userData:", userData);
    
useEffect(() => {
  // Load comments
  comentService.getUserComments(postId).then((res) => {
    if (res) setComents(res.documents);
  });

  // Load avatar from profile
  if (userData?.$id) {
    appwriteService.getUserProfile(userData.$id).then((profile) => {
      if (profile?.avatarImage) {
        const imageUrl = appwriteService.getFileView(profile.avatarImage);
        setUserProfile({ avatarUrl: imageUrl }); // Save usable URL
      }
    });
  }
}, [postId, userData]);


   const handleComentSubmit = async () => {
  if (!newComent.trim()) return;

  const comment = await comentService.createComments({
    postId,
    userId: userData.$id,
    name: userData.name, 
    avatarImage: userProfile?.avatarUrl || "", 
    content: newComent
  });

  if (comment) {
    setComents([...coments, comment]);
    setNewComent("");
  }
};

const handleComentDelete = async(comentId) => {

    const deleted = await comentService.deleteComent(comentId)
    if (deleted) {
        setComents((prev) => prev.filter((c) => c.$id !== comentId))
    }
}

    // console.log("Comments Loaded: ", coments);


  return (
   <div className=" py-4 h-auto px-3">
      <h2 className="text-xl text-gray-600 p-3 font-semibold mb-4">Comments</h2>

      <div className="mb-4 ">
        <textarea
          className="w-full p-2  border-gray-500 outline-none m border-2 rounded"
          placeholder="Write a comment..."
          value={newComent}
          onChange={(e) => setNewComent(e.target.value)}
        />
        <button
          onClick={handleComentSubmit}
          className="mt-2 px-4 md:py-4 py-2  md:font-bold semi-bold bg-blue-600 text-white rounded"
        >
          Post Comment
        </button>
      </div>

      <div className="space-y-4">
    <div className="space-y-4">
  {Array.isArray(coments) && coments.map((c) => {

    return (
      <div key={c.$id} className=" p-3 rounded border-2 border-gray-500">

 <div className="flex items-center justify-between">
       <div className="flex items-center gap-2 py-3">
          {c.avatarImage && (
  <img src={c.avatarImage} alt="avatar" className='w-13 h-13 rounded-full object-cover object-top' />
)}
        <p className=" text-gray-500 font-medium text-xl">
          {c.name || "Unknown User"}
        </p>
    </div>
   {
     userData?.$id  === c.userId && (
         <button className='md:h-14 h-12 md:px-8 px-5 rounded-lg bg-blue-600 md:font-bold semi-bold text-white ' onClick={() => handleComentDelete(c.$id)}>Delete</button>
     )
   }
 </div>
        <p className='py-2 text-lg font-bold text-gray-800 px-5'>{c.content}</p>
      </div>
    )
  })}
</div>

      </div>
    </div>
  )
}

export default ComentPage
