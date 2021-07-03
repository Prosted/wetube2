import mongoose from "mongoose";

const videoShema = new mongoose.Schema({
    title : String,
    description : String,
    createdAt : Date,
    hashtags : [{type : String}],
    meta : {
        rating : Number,
        views : Number
    }
});

const Video = mongoose.model("Video", videoShema);
export default Video;