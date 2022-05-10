import mongoose from 'mongoose';
import PostModel from '../models/Post-model';
import Post from '../models/Post-model'
import User from '../models/User-model';


export const getAllPosts = async (req, res, next) => {
    let posts;
    try {
        posts = await Post.find()
    } catch (err) {
        console.log(err.message);
    }
    if (!posts) {
        return res.status(404).json({message: "No posts Here"})
    }

    return res.status(200).json({posts: posts})

}


export const createPosts = async (req, res, next) => {
    const { title, creator, year, condition, price, image, createdAt } = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findById(creator)
    } catch (err) {
        console.log(err.message);
    }
    if (!existingUser) {
        return res.status(500).json({message: "You have to be registered to post here"})
    }
    
    const Post = new PostModel({
        title, 
        creator, 
        year, 
        condition, 
        price, 
        image, 
        createdAt
    })

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await Post.save(session);
        existingUser.posts.push(Post)
        await existingUser.save(session)
        await session.commitTransaction();
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: err})
    }

        return res.status(200).json({Post})

}

export const updatePost = async (req, res, next) => {
        const { title, year, condition, price, image } = req.body;

    const postId = req.params.id;
    let post;
    try {
        post = await Post.findByIdAndUpdate(postId, {
            title, 
            year, 
            condition, 
            price, 
            image
        })
        
    } catch (err) {
        console.log(err.message);
    }
    if (!post) {
        return res.status(500).json({message: "Post doesn't exist or can't update"})
    }

    return res.status(200).json({post: post})

}

export const getPost = async (req, res, next) => {
    const postId = req.params.id;

    let post;
    try {
        post = await Post.findById(postId)
    } catch (err) {
        console.log(err.message);
    }

        if (!post) {
        return res.status(404).json({message: "Post not found"})
    }

    return res.status(200).json({post})


}

export const deletePost = async (req, res, next) => {
    const postId = req.params.id;

        let post;
    try {
        post = await Post.findByIdAndRemove(postId).populate('creator');
        await post.creator.posts.pull(post);
        await post.creator.save();
    } catch (err) {
        console.log(err.message);
    }

        if (!post) {
        return res.status(500).json({message: "Post not found or unable to delete"})
    }

    return res.status(200).json({message: "Post deleted Successfully"})

}

export const getUserPosts = async (req, res, next) => {
    const userId = req.params.id;
    let userPosts;
    try {
        userPosts = await User.findById(userId).populate("posts")

    } catch (err) {
        console.log(err.message);
    }
        if (!userPosts) {
        return res.status(404).json({message: "No Posts Found"})
    }

    return res.status(200).json({posts: userPosts})


}