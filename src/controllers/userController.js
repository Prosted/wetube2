import User from "../models/User";
import bcrypt from "bcrypt";

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
    try{
        await User.create({
            email,
            userName,
            name,
            password,
            location,
        });
        return res.redirect("/login");
    }
    catch(error){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"SomeThing is wrong"});
    }
}

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle:"login"});
}

export const postLogin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).render("login", {pageTitle:"login", errorMessage : "wrong email"});
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
        return res.status(400).render("login", {pageTitle:"login", errorMessage : "wrong password"});
    }
    return res.redirect("/");
}

export const logout = (req, res) => res.send("Logout");

//user Router
export const edit = (req, res) => res.send("Edit User's Profile");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("Profile");