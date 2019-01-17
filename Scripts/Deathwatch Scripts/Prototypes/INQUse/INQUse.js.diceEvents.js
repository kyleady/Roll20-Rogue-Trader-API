INQUse.prototype.diceEvents = function(){
  var die = this.inqtest.Die;
  var tens = Math.floor(die / 10);
  var ones = (die - tens * 10) || 10;
  if(die == 100) {
    this.critical = 'Failure!';
    this.inqtest.Successes = -1;
  } else if(die == 1) {
    this.critical = 'Success!';
  }

  switch(this.options.FocusStrength){
    case 'Fettered':
      this.PsyPhe = die == 100;
    break;
    case 'Unfettered':
      this.PsyPhe = ones == tens;
    break;
    case 'Push': case 'True':
      this.PsyPhe = true;
    break;
  }

  if(die >= this.jamsAt) {
    this.warning =  getLink(this.inqweapon.Name);
    this.warning += ' **' + getLink(this.jamResult) + '**';
    if(!/s$/.test(this.jamResult)) this.warning += 's';
    this.warning += '!';
    this.inqtest.Successes = -1;
  }
}
