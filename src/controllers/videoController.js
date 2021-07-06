import Video, { formatHashtags } from "../models/Video";
    
//global Router
export const home = async(req, res) => {
    const videos = await Video.find({});
    return res.render("home", {pageTitle : "Home", videos});
}; 

//video Router
export const watch = async(req, res) => {
    const {id} = req.params;
    const video = await Video.findById({_id : id});
    if(!video)
        return res.render("404", {pageTitle : "404 Error"});
    res.render("watch", {pageTitle : "watch", video});
};
export const getEdit = async(req, res) => {
    const {id} = req.params;
    const video = await Video.findById({_id : id});
    if(!video)
        return res.render("404", {pageTitle : "404 Error"});
    res.render("edit", {pageTitle : "Edit", video});
};

export const postEdit = async(req, res) => {
    const {id} = req.params;
    const video = await Video.exists({_id : id});
    if(!video)
        return res.render("404", {pageTitle : "404 Error"});
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
    try{
        await Video.create({
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