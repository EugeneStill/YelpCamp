var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUtD06SnRnLtl02o_e9Z_nY4L4mIn4nBpxMRU6dJH7mCaChN52",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    
    {
        name: "Desert Mesa",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzKmsR-ZoZDjwzL_w4HqpVCCdn3uGmwL3H6-MXUI9XiOhpbinsPg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    
    {
        name: "Canyon Floor",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnAtoVC80nYMVk_VN4uN7H8a4aIqZqiUdwSETSom7MtMlpZWL_",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
    
]

function seedDB(){
    Campground.remove({}, function(err){
      if(err){
          console.log(err);
      } else {
          console.log("removed campgrounds");
      }
    //ADD CAMPGROUNDS
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("Added a campground");
                //CREATE COMMENTS
                Comment.create(
                    {
                        text:"This place is great, but I wish there was wifi",   
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new campground");
                        }
                    });
            }
        });
    });
});   


    //ADD COMMENTS
}

module.exports = seedDB;