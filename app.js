var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

//Requiring Routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp_2", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//Campground Seeder
// seedDB();

//Passport Configuration
app.use(require("express-session")({
    secret:"Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Using Routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// var campgrounds = [
//     { name: "Booty Hill", image: "https://c1.staticflickr.com/4/3934/32498243713_f5d6b17d3d_c.jpg" },
//     { name: "Salty Lake", image: "https://c1.staticflickr.com/5/4424/36786507102_ec79bd6647_c.jpg" },
//     { name: "Grey Bear Forest", image: "https://c1.staticflickr.com/1/917/42626002344_f1f93b3aea_c.jpg" },
//     { name: "Crooked Man Mountain", image: "https://c1.staticflickr.com/4/3867/14423528780_e04fcfefb4_z.jpg" },
//     { name: "Booty Hill", image: "https://c1.staticflickr.com/4/3934/32498243713_f5d6b17d3d_c.jpg" },
//     { name: "Salty Lake", image: "https://c1.staticflickr.com/5/4424/36786507102_ec79bd6647_c.jpg" },
//     { name: "Grey Bear Forest", image: "https://c1.staticflickr.com/1/917/42626002344_f1f93b3aea_c.jpg" },
//     { name: "Crooked Man Mountain", image: "https://c1.staticflickr.com/4/3867/14423528780_e04fcfefb4_z.jpg" },
//     { name: "Booty Hill", image: "https://c1.staticflickr.com/4/3934/32498243713_f5d6b17d3d_c.jpg" },
//     { name: "Salty Lake", image: "https://c1.staticflickr.com/5/4424/36786507102_ec79bd6647_c.jpg" },
//     { name: "Grey Bear Forest", image: "https://c1.staticflickr.com/1/917/42626002344_f1f93b3aea_c.jpg" },
//     { name: "Crooked Man Mountain", image: "https://c1.staticflickr.com/4/3867/14423528780_e04fcfefb4_z.jpg" }
// ]

//Starting Server
app.listen(3000, function () {
    console.log("Server Started");
});