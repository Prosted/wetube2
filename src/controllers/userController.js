import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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
    const user = await User.findOne({email, socialOnly : false});
    if(!user){
        return res.status(400).render("login", {pageTitle:"login", errorMessage : "wrong email"});
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
        return res.status(400).render("login", {pageTitle:"login", errorMessage : "wrong password"});
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

//user Router
export const edit = (req, res) => res.send("Edit User's Profile");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("Profile");

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id : process.env.GH_CLIENTID,
        allow_signup: false,
        scope : "read:user user:email",
    }
    const configUrl = new URLSearchParams(config).toString(); 
    const finalUrl = `${baseUrl}?${configUrl}`;
    return res.redirect(finalUrl);
}

export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id : process.env.GH_CLIENTID,
        client_secret : process.env.GH_CLIENT_SECRET,
        code : req.query.code,
    }
    const configUrl = new URLSearchParams(config).toString(); 
    const finalUrl = `${baseUrl}?${configUrl}`;
    const tokenRequest = await(await fetch(finalUrl, {
        method:"POST",
        headers:{
            Accept : "application/json",
        },
    })).json();
    if("access_token" in tokenRequest){
        const {access_token} = tokenRequest;
        const apiUrl = "http://api.github.com"
        const userData = await(
            await fetch(`${apiUrl}/user`,{
                headers:{
                    Authorization : `token ${access_token}`,
                },
            })
        ).json();
        const emailData = await(await fetch(`${apiUrl}/user/emails`,{
            headers:{
                Authorization : `token ${access_token}`,
            },
        })
    ).json();
    const emailObj = emailData.find((email)=>email.primary === true && email.verified === true);
    if(!emailObj){
        return res.redirect("/login");
    }
    let user = await User.findOne({email : emailObj.email});
    if(!user){
        user = await User.create({
            name : userData.name,
            email : emailObj.email,
            avatarUrl : userData.avatar_url,
            userName : userData.name,
            password : "",
            location : userData.location,
            socialOnly:true,
        });
    }
    req.session.loggedIn = true;
    req.session.user=user;
    return res.redirect("/");
    }else{
        return res.redirect("/login");
    }
}