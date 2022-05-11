import express from 'express'
import { createPosts, deletePost, getAllPosts, getPost, getUserPosts, updatePost } from '../controllers/post-controller'

const postRouter = express.Router()


postRouter.get('/', getAllPosts)
postRouter.post('/create', createPosts)
postRouter.put('/update/:id', updatePost)
postRouter.get('/:id', getPost)
postRouter.delete('/:id', deletePost)
postRouter.get('/user/:id', getUserPosts)



export default postRouter;