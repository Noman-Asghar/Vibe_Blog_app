import React from 'react'
import { useState, useEffect } from 'react'
import {Container} from "../container/Container"
import PostCard from "../PostCard"
import appwriteService from "../appwrite/database"

const AllPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
       appwriteService.getAllPost([]).then((posts) => {
          if (posts) {
            setPosts(posts.documents)
          }
       })
    },[])
  return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap  md:flex-row flex-col ">
            {
                posts.map((post) => (
                    <div key={post.$id} className='p-2 md:w-1/2 w-full'>
                      <PostCard userid={post.$id} {...post} />
                    </div>
                ))
            }
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
