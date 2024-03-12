
exports.homePageHandler = (req,res)=>{
    res.status(200).render("home");
};
exports.checkLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        return res.redirect("/user/profile");
    }
    next();
};
exports.loginHandler = (req,res) =>{
    res.status(200).render("login");
};
exports.checkAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/user/login");
}
exports.profileHandler = (req,res) =>{
    res.status(200).render("profile", {username : req.user.username});
};
exports.logoutHandler = (req,res) =>{
    try {
        req.logout((err)=>{
            if(err){
                return next(err);
            }
            res.redirect("/");
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
};
exports.clientErrorHandler = (req,res,next)=>{
    res.status(404).send("404 Not Found!");
};
exports.serverErrorHandler = (err,req,res,next)=>{
    res.status(500).send({
        message : "Something Broke!",
        error : err.message,
        err
    });
};