var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    util = require('util'),
    express = require('express'),
    logfmt = require("logfmt");

var app = express();


app.set('views', __dirname + '/public/views/');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
    res.render("test.html");
});

var filePath = path.join(__dirname, 'public/views/listOfAllPhones.txt');
app.get('/listOfAllPhones.txt' , function(req , res){ 
	res.setHeader('Content-type' , 'text/plain'); 
	fs.readFile(filePath , function(err , data){ 
		res.end(data); 
	}); 
});
var filePath2 = path.join(__dirname, 'public/views/phoneImages/phoneImages.txt');
app.get('/phoneImages.txt' , function(req , res){ 
	res.setHeader('Content-type' , 'text/plain'); 
	fs.readFile(filePath2, function(err , data){ 
		res.end(data); 
	}); 
});

app.get('/phoneImages/:file', function(req, res){
	var file = req.params.file;
	var filePath3 = path.join(__dirname, 'public/views/phoneImages/'+file);
	res.sendfile(filePath3);
})

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});