// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Solution

let PORT = process.env.PORT || 5000;

app.get("/api/", function (req, res) {
  const date = new Date(Date.now() * 1);
  res.json({
    'unix': Math.floor(Date.now()),
    'utc' : date.toUTCString()});
});

app.get("/api/:date", function(req, res){

  if(new Date(req.params.date) !== "Invalid Date" && !isNaN(new Date(req.params.date)))
  {
    let myDate = new Date(req.params.date);
    let unixDate = Math.floor(myDate);
    let utcDate = myDate.toUTCString();
    res.json({
      'unix': unixDate,
      'utc' : utcDate});
  }
  else if(req.params.date % 1 === 0)
  {
    const dateObject = new Date(req.params.date * 1);
    const humanDateFormat = dateObject.toUTCString();
    res.json({
      'unix': Number(req.params.date),
      'utc' : humanDateFormat});
  }
  else
  {
    res.json({
      error : "Invalid Date" 
    });
  }
});


// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
