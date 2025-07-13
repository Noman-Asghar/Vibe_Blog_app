import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/database"
import {Container} from "../container/Container"
import PostCard from '../PostCard'
import { useSelector } from 'react-redux'

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getAllPost().then((post) => {
           if (post) {
            setPosts(post.documents)
           }
    })
  }, [])

  const authStatus = useSelector((state) => state.auth.status); // ✅ THIS TOO

  
 if (!posts || posts.length === 0) {
  return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              {authStatus ? "No posts found." : "Login to read posts"}
            </h1>
          </div>
        </div>
      </Container>
    </div>
  )
}


  return (
  <div className="py-8">
    <Container>
      <div className="flex flex-wrap gap-3 flex-col items-center">
        {
          posts.map((post) => (
            <div className="w-full" key={post.$id}>
              <PostCard userId={post.$id} {...post} />
            </div>
          ))
        }
      </div>
    </Container>
  </div>
)
}



export default Home
