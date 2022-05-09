import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";


const PORT = 5000 || 5001;

const app = express()

app.use(express.json())

app.use('/posts/user',router)



mongoose.connect('mongodb+srv://AutoMartDemo:AutoMartDemo123@cluster0.2b6ct.mongodb.net/myAutomartdb?retryWrites=true&w=majority')
    .then(() => app.listen(PORT))
    .then(() => console.log(`Connected to Database and listening on PORT: ${PORT}`))
    .catch((e) => console.log(e.message));

