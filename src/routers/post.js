import express from 'express'
import { getAllPostsHandler, getPostByIdHandler, addPostHandler } from '../handlers/post.js';

const router = express.Router()

router.get('/', getAllPostsHandler)      
router.get('/:id', getPostByIdHandler)  
router.post('/', addPostHandler)

export default router

