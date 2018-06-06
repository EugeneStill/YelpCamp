var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");
var geocoder = require("geocoder");

//INDEX - List all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
   });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var price = req.body.price;
//   geocoder.geocode(req.body.location, function (err, data) {
//       if (err || data.status === 'ZERO_RESULTS') {
//             req.flash('error', 'That location is not valid.  Please try again.');
//             return res.redirect('back');
//         }
//     var lat = data.results[0].geometry.location.lat;
//     var lng = data.results[0].geometry.location.lng;
    // var location = data.results[0].formatted_address;
    var newCampground = {name: name, image: image, description: desc, price: price, author:author};//, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    // });
  });
});
//NEW - Show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new")
});

//SHOW - Show all details for one campground
router.get("/:id", function(req, res){
    //find campground for provided id and show that campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

//UPDATE CAMPGROUND
router.put("/:id", function(req, res){
    // geocoder.geocode(req.body.location, function (err, data) {
    //     if (err || data.status === 'ZERO_RESULTS') {
    //         req.flash('error', 'That location is not valid.  Please try again.');
    //         return res.redirect('back');
    //     }
    // var lat = data.results[0].geometry.location.lat;
    // var lng = data.results[0].geometry.location.lng;
    // var location = data.results[0].formatted_address;
    console.log(req);
    //var newlocation = {location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            // Campground.findByIdAndUpdate(req.params.id, {$set: newlocation}, function(err, campground){
            //     if(err){
            //         req.flash("error", err.message);
            //         res.redirect("back");
            //     } else {
                    req.flash("success","Successfully Updated!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        // }
    });
//   });
// });

//DESTROY CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          req.flash("success","Campground Deleted!");
          res.redirect("/campgrounds");
      }
   });
});


module.exports = router;
