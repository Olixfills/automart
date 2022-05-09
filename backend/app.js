import express from "express";
import mongoose from "mongoose";



const PORT = 5000 || 5001;

const app = express()

mongoose.connect('mongodb+srv://AutoMartDemo:AutoMartDemo123@cluster0.2b6ct.mongodb.net/Automartdb?retryWrites=true&w=majority')
    .then(() => app.listen(PORT))
    .then(() => console.log(`Connected to Database and listening on PORT: ${PORT}`))
    .catch((e) => console.log(e.message));
