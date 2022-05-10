import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    creator: {
        type : String,
        required : true
    },
    year: {
        type : String,
        required : true
    },
    condition: {
        type : String,
        required : true
    },
    price: {
        type : String,
        required : true
    },
    Image: {
        type : String,
        required : true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true,
    }
})


export default mongoose.model('Post', postSchema)