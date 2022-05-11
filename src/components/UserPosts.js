/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import axios from "axios";
import Post from "./Post";


const UserPosts = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios.get(`http://localhost:5000/posts/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.posts));
  }, []);

  console.log(user);  
  return (<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {user && user.posts && user.posts.map((post) => <Grid item xs={4} sm={4} md={4}> <Post post={post} id={post._id} key={post._id} isUser={true}/> </Grid>)}
  </Grid>)
}

export default UserPosts