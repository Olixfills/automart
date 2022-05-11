import React from 'react'
import Header from './components/Header';
import {Routes, Route} from 'react-router-dom'
import Auth from './components/Auth';
import AllPosts from './components/AllPosts';
import UserPosts from './components/UserPosts';
import Post from './components/Post';
import AddPost from './components/AddPost';
import { useSelector } from 'react-redux';





function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);





  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/posts' element={<AllPosts />} />
          <Route path='/posts/add' element={<AddPost />} />
          <Route path='/myPosts' element={<UserPosts />} />
          <Route path='/myPosts/:id' element={<Post />} />
        </Routes>

      </main>
      

    </div>
  );
}

export default App;
