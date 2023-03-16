const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();
let items=["Play", "Eat","Code"];
let workItems = [];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(request, response){

    let day = date.getDate();

    response.render("list", {ListTitle: day, newListItems: items});
});

app.post("/" , function(request,response){
    let item = request.body.newItem;
    if (request.body.list === "Work"){
        workItems.push(item);
        response.redirect("/work");
    }else{
        items.push(item);
        response.redirect("/");

    }
    
    

});

app.get("/work" , function(request,response){
    response.render("list", {ListTitle:"Work List", newListItems: workItems});
});



app.listen(3000, function(){
    console.log("server started on port 3000");
});