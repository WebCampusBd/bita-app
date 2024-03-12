require("dotenv").config();
const passport = require("passport");
const { User } = require("../models/users.model");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://bita1.vercel.app/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
        const user = await User.findOne({ googleId: profile.id });
        if(!user){
            const newUser = new User({
                username : profile.displayName,
                googleId : profile.id
            });
            await newUser.save();
            return cb(null, newUser);
        }
        if(user){
            return cb(null, user);
        }
    } catch (error) {
        return cb(error, null);
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