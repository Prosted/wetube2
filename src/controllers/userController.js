import User from "../models/User";

//root Router
export const getJoin = (req, res) => {
    return res.render("join", {pageTitle:"join"});
}

export const postJoin = async (req, res) => {
    const {email, userName, name, password, password2, location} = req.body;
    const exists = await User.exists({$or : [{email}, {userName}]});
    if(exists){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"email/userName is already taken"});
    }
    if(password != password2){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"password is not same"});
    }
    await User.create({
        email,
        userName,
        name,
        password,
        location,
    });
    return res.redirect("/login");
}

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle:"login"});
}

export const postLogin = async (req, res) => {
    const {email, password} = req.body;
    const emailExists = await User.exists({email});
    if(!emailExists){
        return res.status(400).render("login", {pageTitle:"login", errorMessage : "wrong email / password"});
    }
    return res.redirect("/");
}

//user Router
export const edit = (req, res) => res.send("Edit User's Profile");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("Profile");