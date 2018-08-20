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

mongoose.connect("mongodb://localhost:27017/yelp_camp_2", { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// seedDB();

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

app.get("/", function (req, res) {
    res.render("landing");
});

//==========================================Campgrounds===========================================================//

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("Error!!");
            console.log(err);
        } else {
            console.log("Campgrounds found...");
            console.log(allCampgrounds);
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

    Campground.create({
        name: name,
        image: image,
        description: desc
    }, function (err, campground) {
        if (err) {
            console.log("Error!!");
            console.log(err);
        } else {
            console.log("Camp Created");
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });

});

app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

//=====================================Comments=====================================================//

//New Route
app.get("/campgrounds/:id/comments/new", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

//Post Route
app.post("/campgrounds/:id/comments", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

app.listen(3000, function () {
    console.log("Server Started");
});