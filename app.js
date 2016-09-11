// Copyright 2015-2016, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START app]
// 'use strict';



var express = require('express');
var app = express();
// var app = require('express')();


var http = require('http').Server(app);
var firebase = require('firebase');

var io = require('socket.io')(http);

var data1;
firebase.initializeApp({
  serviceAccount: "myapp-c.json",
  databaseURL: "https://myapplication4521.firebaseio.com"
});





var db = firebase.database();
var ref = db.ref().child('text');
// ref.on('value', function(snapshot) {
//   // console.log(snapshot.val());
//   data1=snapshot.val();





  io.on('connection', function(socket){

    ref.on('value', function(snapshot) {
      // console.log(snapshot.val());
      data1=snapshot.val();

    // socket.on('chat message', function(data1){
      io.emit('chat message', data1);
    // });
  });




});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index3.html');
});

// app.get('/', function (req, res) {
//   // res.status(200).send('Hello, world!');
//   res.status(200).send(data1);
//
// });

app.get('/api/data', function (req, res) {
  // res.status(200).send('Hello, world!');
  res.status(200).send(data1);

});


http.listen(8080, function(){
  console.log('listening on *:8080');
});


// Start the server
// var server = app.listen(process.env.PORT || '8080', function () {
//   console.log('App listening on port %s', server.address().port);
//   console.log('Press Ctrl+C to quit.');
// });
// [END app]
