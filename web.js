var express = require("express");
var logfmt = require("logfmt");
var path = require("path");
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
    res.render("index.html");
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
