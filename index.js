
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// Used to interact with mongodb
var mongoose = require('mongoose'); 
//Link to mLab Database
var uri = "mongodb://dhara:patel@ds013981.mlab.com:13981/heroku_w9ktr09s"; 
// var mLab = require('mongolab-data-api')('nXgoAnvnz6pqzRGEC5HJA4HIS8Zd2fv0');


app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());
app.get('/index.html',function(req,res){
    res.sendfile(__dirname + "/" + 'index.html')
})


//Will connect to the Database
mongoose.connect(uri, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uri + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uri);
    }
});

//Schema for document in Collection
var playerschema =   {
    PlayerID: Number,
    FirstName: String,
    LastName: String,
    DOB: String,
    Country: String,
    Height: Number,
    Position: String
};

//provide model for specific collection of database 
var players = mongoose.model('players', playerschema);

//will accept the request, process it, and return the response
app.get('/getPlayer/:id', function (req, res) {

    var ID = parseInt(req.params.id);
    // Query to find a player with specific PlayerID from mLab databse
    players.find({ PlayerID : ID}, function(err, docs){
        if (err) {
            console.log ('ERROR connecting to: ' + err);
        } else {
            console.log(docs);
         res.json(docs);
        }
    })
})

var port = process.env.PORT || 3000;
app.listen(port);