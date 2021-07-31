import mongoose from "mongoose";

export const formatHashtags = (hashtags) =>{
    return hashtags = hashtags.split(",").map(word=>(word.startsWith("#") ? word : `#${word}`));
}

const videoShema = new mongoose.Schema({
    fileUrl : {type:String, required:true},
    title : {type : String, required : true, uppercase:true, trim:true},
    description : {type : String, required : true, uppercase:true, trim:true},
    createdAt : {type : Date, required : true, default : Date.now},
    hashtags : [{type : String}],
    meta : {
        rating : {type : Number, default : 0},
        views : {type : Number, default : 0},
    },
    owner : {type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
});

videoShema.static("formatHashtags", function(hashtags){
    return hashtags.split(",").map(word=>(word.startsWith("#") ? word : `#${word}`));
})


const Video = mongoose.model("Video", videoShema);
export default Video;