var express = require("express");
var app     = express();
var path    = require("path");
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

//application is listening on port 3000
app.listen(3000);

console.log("Running at Port 3000");
