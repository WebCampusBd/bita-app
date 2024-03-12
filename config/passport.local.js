require("dotenv").config();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models/users.model");
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy( async (username, password, done) => {
        try {
            const user = await User.findOne({username : username});
            if (!user) { return done(null, false, {message : 'incorrect username'}); };
            if (!bcrypt.compare(password, user.password)) { return done(null, false, {message : "incorrect password"}); };
            return done(null, user);
        } catch (error) {
            return done(error); 
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});