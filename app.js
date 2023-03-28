const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
main().catch(err=> console.log(err));

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1/todolistDB");
    console.log("connected");

    const itemsSchema = new mongoose.Schema({
        name: String
    });

    const Item = mongoose.model("Item", itemsSchema);

    const item1 = new Item({
        name: "welcome to your todolist!"
    });

    const item2 = new Item({
        name: "hit the + button!"
    });

    const item3 = new Item({
        name: "hit it"
    });

    const defaultItems = [item1,item2,item3];

  

    app.get("/", function(request, response){

    
   
    Item.find({})
    .then(function(foundItems){
        if(foundItems.length === 0){
            return Item.insertMany(defaultItems);
        }else{
           return foundItems; 
        }
    })      
         .then(function(foundItems){
            response.render("list", {ListTitle: "Today", newListItems: foundItems});
         
        }) 
         .catch(function(err){
          console.log(err);
        
        });


        app.post("/" , function(request,response){
            let itemName = request.body.newItem;
            const item = new Item({
                name: itemName
            });
        
            item.save();
            response.redirect("/");
            
            
            
        
        }); 
          
        app.post('/delete', async (req, res) => {

            const checkedItem = req.body.checkbox;
            
            const data = await Item.findByIdAndRemove(checkedItem);
            
            if(data){
            
              res.redirect('/');
            
            }
            
            });

});
};







app.get("/work" , function(request,response){
    response.render("list", {ListTitle:"Work List", newListItems: workItems});
});



app.listen(3000, function(){
    console.log("server started on port 3000");
});