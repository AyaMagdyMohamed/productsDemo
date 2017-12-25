

var express = require('express');


var prouctController= require('./routes/products');
var app=express();
app.use("/products",prouctController);
app.set("view engine","ejs");
app.set("views","./views");
app.listen(process.env.PORT ||8090);


// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
//
//    console.log("Example app listening at http://%s:%s", host, port)
// })
