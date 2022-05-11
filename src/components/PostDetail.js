/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import { Box, Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



const PostDetail = () => {
    const [post, setPost] = useState('');
    const id = useParams().id
    const url = `http://localhost:5000/posts/${id}`
    const fetchPost = async () => {
      const res = await axios.get(url).catch(err => console.log(err.message))
      const data = await res.data
      
      return data;
    }

    useEffect(() => {
      fetchPost()
      .then(data=> setPost(data.post))
      
    }, [id]);
    
    const isUser = localStorage.getItem("userId") === post.creator;
  
  const handleDelete = () => {
    
  }

  


  return (
        <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        subheader={`Posted ${moment(post.createdAt).fromNow()}`}
      />
      <CardMedia
        component="img"
        height="250"
        image={post.image}
        alt={post.title}
      />
      <CardContent>
        <Typography variant='h6' gutterBottom>{post.title}</Typography>
        <Box display='flex' justifyContent='space-between'>
        <Typography variant='body2' sx={{backgroundColor: '#7c95d2', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem', borderRadius: 1, padding: '4px 8px' }}>{post.year}</Typography>
        <Typography variant='body2' sx={{backgroundColor: '#f2f5f6',color: '#13987e', fontSize: '1.2rem', borderRadius: 1, padding: '4px 8px' }}>{post.condition}</Typography>
        </Box>
      </CardContent>
      <CardActions >
        <Typography variant='h6' style={{color: '#1c2435'}}>₦{parseInt(post.price).toLocaleString()}.00</Typography>
        {isUser && (<Button size='small' style={{color: '#f34f28', marginLeft: 'auto'}} onClick={handleDelete} >
          <DeleteForeverIcon />
          DELETE
        </Button>)}
      </CardActions>
        
        
    
    </Card>

  );
}

export default PostDetail






