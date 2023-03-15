const express = require("express");
const bodyParser = require("body-parser");


const app = express();
var items=["Play", "Eat","Code"];
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get("/", function(request, response){

    var today = new Date();
    var currentDay = today.getDay();
    var options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    };


    var day= today.toLocaleDateString("en-US" , options);
    

    response.render("list", {kindofDay: day, newListItems: items});
});

app.post("/" , function(request,response){
    var item = request.body.newItem;
    items.push(item);
    response.redirect("/");

});




app.listen(3000, function(){
    console.log("server started on port 3000");
});