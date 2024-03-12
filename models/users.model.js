const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true
    },
    googleId : {
        type : String,
        required: true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const User = mongoose.model("users", userSchema);

exports.User = User;