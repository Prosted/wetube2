import mongoose from "mongoose";

const videoShema = new mongoose.Schema({
    title : {type : String, required : true, uppercase:true, trim:true, minLength:5, maxLength:20},
    description : {type : String, required : true, uppercase:true, trim:true, minLength:5, maxLength:20},
    createdAt : {type : Date, required : true, default : Date.now},
    hashtags : [{type : String}],
    meta : {
        rating : {type : Number, default : 0},
        views : {type : Number, default : 0}
    }
});

const Video = mongoose.model("Video", videoShema);
export default Video;