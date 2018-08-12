var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

//Schema Setup

var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Salty Lake",
//         image: "https://c1.staticflickr.com/5/4424/36786507102_ec79bd6647_c.jpg",
//         description: "This is a lake full of the salty tears of noobs, campers and scrubs."
//     }, function (err, campground) {
//         if (err) {
//             console.log("Error!!");
//             console.log(err);
//         } else {
//             console.log("Camp Created!");
//             console.log(campground);
//         }
//     });

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

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("Error!!");
            console.log(err);
        } else {
            console.log("Campgrounds found...");
            console.log(allCampgrounds);
            res.render("index", { campgrounds: allCampgrounds });
        }
    });
    // res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;

    // campgrounds.push({ name: name, image: image });

    Campground.create({
        name: name,
        image: image
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
    res.render("new");
});

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log("Error!!!");
            console.log(err);
        } else {
            res.render("show", { campground: foundCampground });
        }
    });
});

app.listen(3000, function () {
    console.log("Server Started");
});