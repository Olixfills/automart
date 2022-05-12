import React, {useState} from 'react';
import { AppBar, Box, Button, Toolbar, Typography, Tabs, Tab, IconButton, MenuItem } from '@mui/material'
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "../store";



const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const [tabVal, setTabVal] = useState(0)
const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 
  return (
    <AppBar sx={{background: "#415162"}} position='sticky'>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Link style={{textDecoration: 'none'}} textAlign="center"  to="/posts">All Posts</Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Link style={{textDecoration: 'none'}} textAlign="center" to="/myPosts">My Posts</Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Link style={{textDecoration: 'none'}} textAlign="center" to="/posts/add">Post an Ad</Link>
                </MenuItem>
              
            </Menu>
        <Typography variant="h4" sx={{ color: "#fff", marginRight: 'auto' }}>AutoMart</Typography>
          </Box>
        <Typography variant="h4" sx={{ color: "#fff", display: { xs: 'none', md: 'flex' } }}>AutoMart</Typography>
        {isLoggedIn && <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} marginLeft='auto'>
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