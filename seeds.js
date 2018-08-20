var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
    image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d1156d3e4dfafbc71a9f293939f3243&auto=format&fit=crop&w=1095&q=80",
    description: "It's soooooo fluffy! Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        name: "Dino Park",
    image: "https://images.unsplash.com/photo-1486082570281-d942af5c39b7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d06322d7df8c19c1e648c8c3a101d2d&auto=format&fit=crop&w=1051&q=80",
    description: "Where all the old farts come to rest Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        name: "Red Dawn Park",
    image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d95171e276fbd03de651f9aecb64b53d&auto=format&fit=crop&w=1050&q=80",
    description: "Great sunsets despite the name Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        name: "Pedro Mountain",
    image: "https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d4c6f1e147755aaf14f158a34e0ea68f&auto=format&fit=crop&w=1050&q=80",
    description: "It's actually a thing... Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Succesfully removed all campgrounds");
            //Add code here to remove all comments
            Comment.remove({}, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Succesfully removed all comments");
                    data.forEach(function(seed){
                        Campground.create(seed, function(err, campground){
                            if(err){
                                console.log(err);
                            }else{
                                console.log("Added a campground...");
                                Comment.create(
                                    {
                                        text: "This place is great but I wish there was Internet",
                                        author: "Homer"
                                    }, function(err, comment){
                                        if(err){
                                            console.log(err);
                                        }else{
                                            campground.comments.push(comment);
                                            campground.save();
                                            console.log("Created new comment");
                                        }
                                    });
                            }
                        });
                    });
                }
            });
        }
    });

}

module.exports = seedDB;