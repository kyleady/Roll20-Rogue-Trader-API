INQTest.prototype.roll = function(){
  this.Die = randomInteger(100);
  var total = 0;
  for(var modifier of this.Modifiers){
    total += modifier.Value;
  }
  var test = this.Stat + total - this.Die;
  this.Successes = Math.floor(Math.abs(test)/10);
  this.Successes += Math.ceil(this.Unnatural/2);
  if(test < 0) {
    this.Failures = this.Successes;
    this.Successes = -1;
  } else {
    this.Failures = -1;
  }

  return this.Successes;
}
