import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Post from './Post';

const AllPosts = () => {
  const [posts, setPosts] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/posts/")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setPosts(data.posts));
  }, []);
  console.log(posts);



  return (<div>
    {posts && posts.map((post) => <Post post={post} key={post._id}/>)}
  </div>)
}

export default AllPosts