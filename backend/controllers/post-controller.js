import Post from '../models/Post-model'


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

