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
    return res.redirect("/users/edit");
}

export const publicOnlyMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        return res.redirect("/");
    }
    next();
}