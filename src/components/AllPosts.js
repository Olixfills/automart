import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import axios from 'axios'
import Post from './Post';


const AllPosts = () => {
  const [posts, setPosts] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("https://automartre.herokuapp.com/posts/")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setPosts(data.posts));
  }, [posts]);
  console.log(posts);



  return (<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {posts && posts.map((post) => <Grid item xs={4} sm={4} md={4}> <Post isUser={localStorage.getItem("userId")===post.creator._id} post={post} id={post._id} key={post._id}/> </Grid>)}
  </Grid>
    )
}

export default AllPosts