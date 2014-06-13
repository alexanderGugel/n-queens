var all, count;

var tryFunc = function (ld, cols, rd) {

  if (cols === all) {
    count++;
    return;
  }

  var poss = ~(ld | cols | rd) & all;

  while (poss) {
    var bit = poss & -poss;
    poss ^= bit;
    tryFunc((ld | bit) << 1, cols | bit, (rd | bit) >> 1);
  }
};

all = 1;

for (var n = 1; n < 13; n++) {
  count = 0;
  tryFunc(0, 0, 0);
  console.log("There are " + count + " solutions to " + n + "-queens problem");
  all = 2*all + 1;
}
