var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//Index Route
router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log("Error!!");
            console.log(err);
        } else {
            // console.log("Campgrounds found...");
            // console.log(allCampgrounds);
            res.render("campgrounds/index", { campgrounds: allCampgrounds});
        }
    });
});

//Create Route
router.post("/", function (req, res) {
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

//New Route
router.get("/new", function (req, res) {
    res.render("campgrounds/new");
});

//Show Route
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

module.exports = router;