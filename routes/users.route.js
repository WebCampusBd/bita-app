const { User } = require("../models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = require("express").Router();

router.get("/register", (req,res)=>{
    res.status(200).render("register");
});

router.post("/register", async (req,res)=>{
    try {
        const user = await User.findOne({username : req.body.username});
        if(!user){
            bcrypt.hash(req.body.password, saltRounds,async (err, hash) =>{
                const newUser = new User({
                    username : req.body.username,
                    password : hash
                });
                await newUser.save();
                res.redirect("/user/login");
            })
        }else{
            res.status(400).send("<h3 align='center'>username already exists</h3>")
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


exports.usersRoute = router;