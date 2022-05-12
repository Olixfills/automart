import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import moment from 'moment'
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


export default function Post({post, isUser, id}) {
  const navigate = useNavigate()
   const {image, title, creator, createdAt, year, condition, price, } = post

  const deletePost = async () => {
    const url = `http://localhost:5000/posts/${id}`;

    const res = await Axios.delete(url)
      .catch(err => console.log(err.message));
    const data = res.data;
    return data;
  }
  

  const handleMore = (e) => {
    navigate(`/post/${id}`)
  }
  const handleDelete = () => {
    deletePost().then(()=>navigate("/")).then(()=>navigate("/posts"))
      .then(data => console.log(data));
    
  }
  
  if (!post) {
    return <Typography variant='h2' textAlign='center' >YOU HAVE NO POSTS TO VIEW HERE</Typography>
  }

  return (
    <Card sx={{ maxWidth: 400 }} >
      <CardHeader
        
        action={
          (<IconButton aria-label="settings" sx={{ fontSize: "0.8rem" }} onClick={handleMore}>
            <MoreVertIcon /> More
          </IconButton>)
        }
        title={creator.name}
        subheader={`Posted ${moment(createdAt).fromNow()}`}
      />
      <CardMedia
        component="img"
        height="200" 
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant='h6' gutterBottom>{title}</Typography>
        <Box display='flex' justifyContent='space-between'>
        <Typography variant='body2' sx={{backgroundColor: '#7c95d2', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem', borderRadius: 1, padding: '4px 8px' }}>{year}</Typography>
        <Typography variant='body2' sx={{backgroundColor: '#f2f5f6',color: '#13987e', fontSize: '1.2rem', borderRadius: 1, padding: '4px 8px' }}>{condition}</Typography>
        </Box>
      </CardContent>
      <CardActions >
        <Typography variant='h6' style={{color: '#1c2435'}}>₦{parseInt(price).toLocaleString()}.00</Typography>
        {isUser && (<Button size='small' style={{color: '#f34f28', marginLeft: 'auto'}} onClick={handleDelete} >
          <DeleteForeverIcon />
          DELETE
        </Button>)}
      </CardActions>
        
        
    
    </Card>
  );
}
