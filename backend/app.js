import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import postRouter from "./routes/post-routes";
import cors from 'cors';


const PORT = 5000 || 5001;

const app = express()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())

app.use(express.json())

app.use('/posts/user',router)
app.use('/posts',postRouter)



mongoose.connect('mongodb+srv://AutoMartDemo:AutoMartDemo123@cluster0.2b6ct.mongodb.net/myAutomartdb?retryWrites=true&w=majority')
    .then(() => app.listen(PORT))
    .then(() => console.log(`Connected to Database and listening on PORT: ${PORT}`))
    .catch((e) => console.log(e.message));

