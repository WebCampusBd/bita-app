const express  = require("express");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();
require("./config/passport.local");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { serverErrorHandler, clientErrorHandler, logoutHandler, profileHandler, checkAuthenticated, loginHandler, checkLoggedIn, homePageHandler } = require("./controllers/users.controller");
const { usersRoute } = require("./routes/users.route");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static("public"));
app.set("public", path.resolve("./public"));
app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use("/user", usersRoute);

// Session Create
app.set('trust proxy', 1)
app.use(session({
secret: 'keyboard cat',
resave: false,
saveUninitialized: true,
store: MongoStore.create({
    mongoUrl : process.env.DB_URL,
    collectionName : "sessions"
})
}));

app.use(passport.initialize());
app.use(passport.session());

// Home Route
app.get("/", homePageHandler);

// Login
app.get("/user/login" ,checkLoggedIn, loginHandler);

// User Authenticate 
app.post('/user/login', 
  passport.authenticate('local', { failureRedirect: '/user/login', successRedirect: '/user/profile' })
);

// Profile Page 
app.get("/user/profile" , checkAuthenticated, profileHandler);

// Logout
app.get("/user/logout", logoutHandler);

// Client Error Handler
app.use(clientErrorHandler);

// Server Error Handler
app.use(serverErrorHandler);

exports.app = app;