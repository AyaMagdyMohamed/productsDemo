var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var mongoose = require("mongoose");
var router =express.Router();
//middle ware to parse requestbody
//"mongodb://127.0.0.1/inventory"
mongoose.connect(process.env.MONGOLAB_URI);
mongoose.model("products",{ name:String ,price:Number })
var requestbody=bodyParser.urlencoded({extended:false});

router.get("/",function(req,resp){

  mongoose.model("products").find({},function(err,products){
       console.log(products);
      resp.render("result",{"products":products});
 })

})

router.get("/add",function(req,resp){

resp.render("add")
resp.send("add");

})
router.get("/search",function(req,resp){

resp.render("search")

});


router.post("/search",requestbody,function(req,resp)
{
  mongoose.model("products").find({"name":req.body.name},function(err,products){
       console.log(products);
      resp.render("result",{"products":products});
 })

}
)
  router.get("/edit",function(req,resp){

  resp.render("update")

  });

  router.post("/edit",requestbody,function(req,resp)
  {
     mongoose.model("products").update({"name":req.body.name},{"name":req.body.name,"price":req.body.price},function(err,products){
         console.log(products);
        resp.render("list");
      })

  })

router.get("/delete",function(req,resp){
resp.render("delete");
})
router.post("/delete",requestbody,function(req,resp)
{
    mongoose.model("products").remove({"name":req.body.name},function(){

  })
  })
router.post("/add",requestbody,function(req,resp)
{
       console.log(req.body.name)
      var productModel=mongoose.model("products")
      var new_product=new productModel()
      new_product.name=req.body.name;
      new_product.price=req.body.price;
      new_product.save(function(err){
        console.log("saved");
        resp.render("list")
})
         //console.log(products);


})

module.exports=router;
