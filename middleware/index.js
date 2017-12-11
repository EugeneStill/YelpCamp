var Campground = require("../models/campground");
var Comment = require("../models/comment");

//ALL THE MIDDLEWARE GOES HERE
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
 //IS USER LOGGED IN
    if(req.isAuthenticated()){
        //DOES USER OWN CAMPGROUND
            Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //DOES USER OWN CAMPGROUND
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
 //IS USER LOGGED IN
    if(req.isAuthenticated()){
        //DOES USER OWN CAMPGROUND
            Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                //DOES USER OWN COMMENT
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj