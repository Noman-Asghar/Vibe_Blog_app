import {Container} from "../container/Container"
import PostForm from "../components/Post-Form/PostForm"
import React from 'react'

const AddPost = () => {
  return (
    <div className="py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost
