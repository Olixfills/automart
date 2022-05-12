import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import postRouter from "./routes/post-routes";
import cors from 'cors';
import dotenv from 'dotenv'


const PORT = process.env.PORT || 5000;

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())

app.use(express.json())

app.use('/posts/user',router)
app.use('/posts',postRouter)



mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT))
    .then(() => console.log(`Connected to Database and listening on PORT: ${PORT}`))
    .catch((e) => console.log(e.message));

