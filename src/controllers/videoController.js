const videos = [
    {
        title : "first Video",
        rate : "2",
        metascore : "8.65",
        update : "3 hours ago",
        author : "prosted"
    },
    {
        title : "Second Video",
        rate : "2",
        metascore : "8.65",
        update : "3 hours ago",
        author : "prosted"
    },   
    {
        title : "Third Video",
        rate : "2",
        metascore : "8.65",
        update : "3 hours ago",
        author : "prosted"
    }      
];
    


//global Router
export const trending = (req, res) => res.render("home", {pageTitle : "Home", videos}); 
export const search = (req, res) => res.render("search", {pageTitle : "Search"});

//video Router
export const watch = (req, res) => {
    const id = req.params.id;
    console.log(`id : ${id}`);
    return res.send(`Watch Video #${id}`);
};
export const edit = (req, res) => res.render("edit", {pageTitle : "Edit"});
export const remove = (req, res) => res.send("Delete Video");
export const upload = (req, res) => res.send("upload Video");