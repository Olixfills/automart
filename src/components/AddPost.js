import React, {useState} from 'react'
import { TextField, Button, Typography, MenuItem } from '@mui/material';
import FileBase from 'react-file-base64'
import { Box } from '@mui/system';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Form = () => {
  const navigate = useNavigate()
const url = 'http://localhost:5000/posts/create';


const [postData, setPostData] = useState({
    title: '',  
    year: '', 
    condition: '', 
    selectedFile: '', 
    price: '',
  })

  const conditionValues = [{value: 'New', label: 'New'}, {value: 'Used', label: 'Used'}]



  const sendPosts = async () => {
    const res = await Axios.post(url,
      { ...postData, creator: localStorage.getItem("userId") })
      .catch(err => console.log(err));
    const data = await res.data;

    return data.posts
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    sendPosts().then(()=>navigate("/")).then(()=>navigate("/posts"))
    clear()
    
  }

  const clear = (e) => {
    setPostData({
    creator: '', 
    title: '',
    year: '', 
    condition: '', 
    image: '', 
    price:'',
    })
    
  }







  return (
    <Box

          borderRadius={3}
          boxShadow="5px 5px 20px 5px #fff"
          padding={3}
          margin={"auto"}
          marginTop={10}
          width={{xs: '80%', md: '50%'}} >
      <form
        onSubmit={handleSubmit}
        autoComplete='off'
        noValidate        
      >
        <Box
          display="flex"
          flexDirection={"column"}
          
        >
        <Typography variant='h4' textAlign={"center"}> Post an Advert</Typography>
        <TextField
          name='title'
          variant='outlined'
          label='title'
          fullWidth 
          value={postData.title}
          onChange={(e) => {
            setPostData({...postData, title: e.target.value})
          }}
            sx={{ margin: "15px 0"}}
        />
        <Box sx={{display: 'flex', margin: "15px 0", width: '100%'}}>
        <TextField
          name= 'year' fullWidth
          variant='outlined'
          label='year'
          type="number" 
          value={postData.year}
          onChange={(e) => {
            setPostData({...postData, year: e.target.value})
          }}
          sx={{ marginRight: "15px"}}
        />
        <TextField
          name='condition'
          select  fullWidth
          // value={conditionValues}
          variant='outlined'
          label='condition' 
          value={postData.condition}
          onChange={(e) => {
            setPostData({...postData, condition: e.target.value})
          }}
        >
          {conditionValues.map((val) => (
            <MenuItem key={val.value} value={val.value}>
              {val.label}
            </MenuItem>
          ))}
          </TextField>
          </Box>
        <TextField
          name='price'
          variant='outlined'
          label='price' type="number" placeholder='₦'
          fullWidth 
          value={postData.price}
          onChange={(e) => {
            setPostData({...postData, price: e.target.value})
          }} sx={{ margin: "15px 0"}}
        />
        <Box  sx={{ margin: "15px auto"}}>
          <FileBase 
            type='file' 
            multiple={false} 
            onDone={({ base64 }) => {
              setPostData({ ...postData, image: base64 })
              }} 
              
          />
        </Box>
        <Button  color='primary' variant='contained' size='large' type='submit' >Submit</Button>

        
        <Button sx={{width: '40%', margin: '15px auto', color: '#ee6350'}} color="error" variant="outlined" onClick={clear}>Clear</Button>
        
        </Box>
      </form>

    </Box>

  )
}

export default Form;