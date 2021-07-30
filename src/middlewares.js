import multer from "multer";

export const localMiddleware = (req, res, next) =>{
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    res.locals.siteName = "Wetube";
    next();
}

export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        return next();
    }
    return res.redirect("/");
}

export const publicOnlyMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        return res.redirect("/");
    }
    next();
}

export const uploadAvatar = multer({
    dest:"uploads/avatar/",
    limits : {
        fileSize : 1000000,
    }
});

export const uploadVideo = multer({
    dest : "uploads/video/",
    limits : {
        fileSize : 30000000,
    }
});



