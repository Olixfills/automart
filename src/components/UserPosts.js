import React, { useEffect, useState } from "react";
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
  return (<div>
    {user && user.posts && user.posts.map((post) => <Post post={post} key={post._id} isUser={true}/>)}
  </div>)
}

export default UserPosts