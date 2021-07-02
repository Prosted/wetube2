const videos = [
    {
        title : "First Video",
        rating : 4,
        views : 56,
        upload : "3 minutes ago",
        id : 1
    },
    {
        title : "Second Video",
        rating : 4,
        views : 30,
        upload : "3 minutes ago",
        id : 2
    },
    {
        title : "Third Video",
        rating : 4,
        views : 101,
        upload : "3 minutes ago",
        id : 3
    },
];
    
//global Router
export const trending = (req, res) => res.render("home", {pageTitle : "Home", videos}); 

//video Router
export const watch = (req, res) => {
    const {id} = req.params;
    const video = videos[id-1];
    res.render("watch", {pageTitle : "watch", video});
};
export const getEdit = (req, res) => {
    const {id} = req.params;
    const video = videos[id-1];
    res.render("edit", {pageTitle : "Edit", video});
};

export const postEdit = (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    videos[id-1].title = title;
    res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) =>{
    res.render("upload", {pageTitle : "upload"});
}

export const postUpload = (req, res)=>{
    const {title} = req.body;
    const newId = videos.length + 1;
    const newVideo = {
        title : title,
        rating : 0,
        views : 0,
        upload : "1 minutes ago",
        id : newId
    }
    videos.push(newVideo);
    res.redirect("/");
}   