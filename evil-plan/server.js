var express = require('express');
var app = express();
app.use(function (req, res, next) {
  // // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://run.jsbin.io');

  // res.setHeader('Access-Control-Allow-Origin', 'http://fiddle.jshell.net');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var bodyParser = require('body-parser');


var counter = 0;
var jobs = [];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

app.get('/api/jobs', function (req, res) {
  var job = jobs.shift();
  console.log('Job requested: ' + JSON.stringify(job));
  console.log('Solution: ' + counter);
  res.send(job);
});

app.post('/api/jobs', function (req, res) {
  if (req.body) {
    jobs.push(req.body);
    console.log('New job: ' + JSON.stringify(req.body));
  }
  console.log('Solution: ' + counter);
  res.send({ status: 'success' });
});

app.post('/api/count', function (req, res) {
  counter++;
  console.log('Found solution: ' + counter);
  res.send({ status: 'success' });
});

// Initial job (N=4)
jobs.push({
  ld: 0,
  cols: 0,
  rd: 0,
  all: 15
});

app.listen(3141);

/*
var tryFunc = function (ld, cols, rd, all) {

  if (cols === all) {
    $.post('http://localhost:3141/api/count');
    return;
  }

  var poss = ~(ld | cols | rd) & all;

  while (poss) {
    var bit = poss & -poss;
    poss = poss - bit;

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3141/api/jobs',
      data: {
        ld: (ld | bit) << 1,
        cols: cols | bit,
        rd: (rd | bit) >> 1,
        all: all
      },
      dataType: 'json'
    });
  }
};


$.getJSON('http://localhost:3141/api/jobs', function (job) {
  tryFunc(job.ld, job.cols, job.rd, job.all);
});



 */

