var  express = require("express"),
     app = express(),
     bodyParser = require("body-parser"),
     mongoose = require("mongoose"),
     flash = require("connect-flash"),
     passport = require("passport"),
     LocalStrategy = require("passport-local"),
     methodOverride = require("method-override"),
     Campground = require("./models/campground"),
     Comment = require("./models/comment"),
     User = require("./models/user"),
     seedDB = require("./seeds");

//REQUIRING ROUTES     
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.Promise = global.Promise;

// PROD DB SETTING
var databaseUri = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";

// TEST DB SETTING
//var databaseUri = "mongodb://localhost/yelp_camp";

    mongoose.connect(databaseUri, { useMongoClient: true })
          .then(() => console.log(`Database connected at ${databaseUri}`))
          .catch(err => console.log(`Database connection error: ${err.message}`));

// console.log(process.env.GMAILPW);
// console.log(process.env.MAPAPI);
// console.log(process.env.ADMINCODE);


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//SEED THE DATABASE
//seedDB();

app.locals.moment = require("moment");

//PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret: "Buster really was a great dog",
   resave: false, 
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MIDDLEWARE TO PASS USER AND FLASH MESSAGE TO ALL ROUTES
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp Server Has Started!");
});