import React from 'react'
import Header from './components/Header';
import {Routes, Route} from 'react-router-dom'
import Auth from './components/Auth';
import AllPosts from './components/AllPosts';
import UserPosts from './components/UserPosts';
import Post from './components/Post';
import AddPost from './components/AddPost';
import Container from '@mui/material/Container';
import PostDetail from './components/PostDetail';





function App() {





  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <Container sx={{ marginTop: 2}}>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/posts' element={<AllPosts />} />
          <Route path='/post/:id' element={<PostDetail/>} />
          <Route path='/posts/add' element={<AddPost />} />
          <Route path='/myPosts' element={<UserPosts />} />
          <Route path='/myPosts/:id' element={<Post />} />
        </Routes>

      </Container>
      

    </div>
  );
}

export default App;
