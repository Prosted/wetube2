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
    const video = await Video.findById({_id : id});
    if(!video)
        return res.status(400).render("error", {pageTitle : "Server Error"});
    res.render("watch", {pageTitle : "watch", video});
};
export const getEdit = async(req, res) => {
    const {id} = req.params;
    const video = await Video.findById({_id : id});
    if(!video)
        return res.status(400).render("error", {pageTitle : "Server Error"});
    res.render("edit", {pageTitle : "Edit", video});
};

export const postEdit = async(req, res) => {
    const {id} = req.params;
    const video = await Video.exists({_id : id});
    if(!video)
        return res.status(400).render("error", {pageTitle : "Server Error"});
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
    const {title, description, hashtags} = req.body;
    const {path} = req.file;
    try{
        await Video.create({
            fileUrl : path,
            title,
            description,
            hashtags : formatHashtags(hashtags),
        });
        res.redirect("/");
    }catch(error){
        console.log(error);
        res.render("upload", {pageTitle : "Upload", errorMessage : error._message});
    }
}   

export const deleteVideo = async(req, res) => {
    const {id} = req.params;
    await Video.findByIdAndDelete(id);
    res.redirect("/");
}