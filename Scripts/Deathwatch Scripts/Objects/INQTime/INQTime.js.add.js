INQTime.add = function(times) {
  this.fraction += this.toFraction(times);
  while(this.fraction >= 10000) {
    this.fraction -= 10000;
    this.year++;
  }

  while(this.fraction < 0) {
    this.fraction += 10000;
    this.year--;
  }

  while(this.year >= 1000) {
    this.year -= 1000;
    this.mill++;
  }

  while(this.year < 0) {
    this.year += 1000;
    this.mill--;
  }
}
