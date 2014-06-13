// var counter = 0;

var sendJob = function (job) {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3141/api/jobs',
    data: job,
    dataType: 'json',
    async: false
  });
};

var execJob = function () {
  $.getJSON('http://localhost:3141/api/jobs', function (job) {
    console.log(job);
    if (job !== undefined) {
      tryFunc(job.ld, job.cols, job.rd, job.all);
    }
  });
};

var incrCounter = function () {
  $.post('http://localhost:3141/api/count');
};

var tryFunc = function (ld, cols, rd, all) {
  // send to api/count
  if (cols === all) {
    incrCounter();
    return;
  }

  var poss = ~(ld | cols | rd) & all;

  while (poss) {
    var bit = poss & -poss;
    poss ^= bit;
    sendJob({
        ld: (ld | bit) << 1,
        cols: cols | bit,
        rd: (rd | bit) >> 1,
        all: all
    });
    execJob();
  }
};



////
// var n = 10;

// Calculate all
// var all = 1;
// for (var i = 1; i < n; i++) {
//  all = 2*all + 1;
// }

// get 1st job from server
execJob();

// console.log("There are " + counter + " solutions to " + n + "-queens problem");
