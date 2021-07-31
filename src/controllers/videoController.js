import User from "../models/User";
import Video, { formatHashtags } from "../models/Video";
    
//global Router
export const home = async(req, res) => {
    const videos = await Video.find({}).sort({createdAt:"desc"});
    return res.render("home", {pageTitle : "Home", videos});
}; 
export const search = async(req, res) => {
    const {keyword} = req.query;
    let videos=[];
    if(keyword){
        videos = await Video.find({title : {$regex : new RegExp(`${keyword}`, "i")}}); 
    }
    res.render("search", {pageTitle:"search", videos});
} 

//video Router
export const watch = async(req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id).populate("owner");
    if(!video){
        return res.status(400).render("error", {pageTitle : "Server Error"});
    }
    return res.render("watch", {pageTitle : "watch", video});
};

export const getEdit = async(req, res) => {
    const {
        session : {
            user : {_id},
        }
    } =req;
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video)
        return res.status(400).render("error", {pageTitle : "Server Error"});
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    }
    return res.render("edit", {pageTitle : "Edit", video});
};

export const postEdit = async(req, res) => {
    const {
        session :{
            user : {_id},
        }
    }=req;
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video)
        return res.status(400).render("error", {pageTitle : "Server Error"});
    if(String(video.owner)!=String(_id)){
        return res.status(403).redirect("/");
    }
    const {title, description, hashtags} = req.body;
    await Video.findOneAndUpdate(id, {
        title,
        description,
        hashtags : formatHashtags(hashtags),
    });
    res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) =>{
    res.render("upload", {pageTitle : "upload"});
}

export const postUpload = async(req, res)=>{
    const {
        session:{
            user:{_id},
        }
    }=req;
    const {title, description, hashtags} = req.body;
    const {path} = req.file;
    try{
        const video = await Video.create({
            owner : _id,
            fileUrl : path,
            title,
            description,
            hashtags : formatHashtags(hashtags),
        });
        const user = await User.findById(_id);
        user.videos.push(video._id);
        await user.save();
        res.redirect("/");
    }catch(error){
        console.log(error);
        res.render("upload", {pageTitle : "Upload", errorMessage : error._message});
    }
}   

export const deleteVideo = async(req, res) => {
    const {
        session : {
            user : {_id},
        }
    } =req;
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status(400).render("error", {pageTitle : "Server Error"});
    }
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    res.redirect("/");
}