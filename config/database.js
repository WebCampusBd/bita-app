require("dotenv").config();
const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;

const dbConnect = async () =>{
    try {
        await mongoose.connect(dbUrl);
        console.log("Db is Connnected!");
    } catch (error) {
        console.log(error.message);
        console.log("Db is Not Connnected!");
        process.exit(1);
    }
}

exports.dbConnect = dbConnect;