var sendJob = function (job) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3141/api/jobs',
        data: job,
        dataType: 'json',
        async: false
    });
};

var incrCounter = function () {
    $.post('http://localhost:3141/api/count');
};

var execJob = function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3141/api/jobs',
        dataType: 'json',
        async: false,
        success: function(job) {
            job.ld = parseInt(job.ld);
            job.cols = parseInt(job.cols);
            job.rd = parseInt(job.rd);
            job.all = parseInt(job.all);
            if (!jQuery.isEmptyObject(job)) {
                tryFunc(job.ld, job.cols, job.rd, job.all);
            }
        }
    });
};

var tryFunc = function (ld, cols, rd, all) {
    if (cols === all) {
        incrCounter();
        return;
    } else {
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
        }
    }
};

setInterval(function () {
    execJob();
}, 100);
