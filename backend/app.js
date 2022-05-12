import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import postRouter from "./routes/post-routes.js";
import cors from 'cors';
import dotenv from 'dotenv'


const PORT = process.env.PORT || 5000;

const app = express()
app.use(cors())

dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


app.use(express.json())

app.use('/posts/user',router)
app.use('/posts',postRouter)



app.get('/', (req, res) => {
    res.send("App is running")
});
const CONNECTION_URL = 'mongodb+srv://AutoMartDemo:AutoMartDemo123@cluster0.2b6ct.mongodb.net/myAutomartdb?retryWrites=true&w=majority'

mongoose.connect(process.env.CONNECTION_URL || CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT))
    .then(() => console.log(`Connected to Database and listening on PORT: ${PORT}`))
    .catch((e) => console.log(e.message));


