//global Router
export const trending = (req, res) => res.send("Home"); 
export const search = (req, res) => res.send("Search");

//video Router
export const watch = (req, res) => {
    const id = req.params.id;
    console.log(`id : ${id}`);
    return res.send(`Watch Video #${id}`);
};
export const edit = (req, res) => res.send("Edit Video");
export const remove = (req, res) => res.send("Delete Video");
export const upload = (req, res) => res.send("upload Video");