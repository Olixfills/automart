import React, {useState} from 'react';
import {AppBar, Box, Button, Toolbar, Typography, Tabs, Tab} from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "../store";



const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const [tabVal, setTabVal] = useState(0)


  return (
    <AppBar sx={{background: "#415162"}} position='sticky'>
      <Toolbar>
        <Typography variant="h4" sx={{ color: "#fff" }}>AutoMart</Typography>
        {isLoggedIn && <Box display='flex' marginLeft='auto'>
          <Tabs value={tabVal} onChange={(e, val)=> setTabVal(val)} textColor="inherit" >
            <Tab LinkComponent={Link} to="/posts" label="All Posts" sx={{ color: "#fff", borderRadius: 1 }}/>
            <Tab LinkComponent={Link} to="/myPosts" label="My Posts" sx={{ color: "#fff", borderRadius: 1 }}/>
            <Tab LinkComponent={Link} to="/posts/add" label="Post an Ad" sx={{ color: "#fff", borderRadius: 1 }}/>
          </Tabs>
        </Box>}
        <Box marginLeft='auto'>
          {!isLoggedIn && (<>
          <Button LinkComponent={Link} to="/auth" sx={{color: "#fff", margin: 1}}>Log in/Sign up</Button></>)}
          {isLoggedIn && <Button onClick={() => dispatch(authActions.logout())} LinkComponent={Link} to="/auth" sx={{color: "#fff", margin: 1}}>Log out</Button>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header