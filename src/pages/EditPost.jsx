import React, { useEffect, useState } from 'react'
import {Container} from "../container/Container"
import PostForm from "../components/Post-Form/PostForm"
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from "../appwrite/database"


const EditPost = () => {
    const [post, setPost] = useState([])
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(() => {
        appwriteService.getPost(slug).then((post) => {
            if (post) {
                setPost(post)
            }else{
                navigate("/")
            }
        })
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) :  null
}

export default EditPost
