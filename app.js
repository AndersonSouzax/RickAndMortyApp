var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');

app.use(function(req,res,next){
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers','content-type');
  // Pass to next layer of middleware
  next();
});

// support json encoded bodies
app.use(bodyParser.json());

// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/public',express.static(__dirname + '/public'));
app.use('/images',express.static(__dirname + '/app/images'));
app.use(express.static(__dirname + '/app/images'));

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname +'/public/index.html'));
});

var server = http.createServer(app).listen(3000,function(err){
    if(err){
      console.log(err);
    }else{
      console.log('listening on port: ' + server.address().port);
    }
});