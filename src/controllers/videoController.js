import Video from "../models/Video";
    
//global Router
export const home = async(req, res) => {
    const videos = await Video.find({});
    return res.render("home", {pageTitle : "Home", videos});
}; 

//video Router
export const watch = (req, res) => {
    const {id} = req.params;
    res.render("watch", {pageTitle : "watch"});
};
export const getEdit = (req, res) => {
    const {id} = req.params;
    res.render("edit", {pageTitle : "Edit"});
};

export const postEdit = (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
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
            hashtags : hashtags.split(",").map(word=>`#${word}`),
        });
        res.redirect("/");
    }catch(error){
        console.log(error);
        res.render("upload", {pageTitle : "Upload", errorMessage : error._message});
    }
}   