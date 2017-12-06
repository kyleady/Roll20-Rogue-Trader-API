INQUse.prototype.diceEvents = function(){
  var die = this.test.Die;
  var tens = Math.floor(die / 10);
  var ones = die - tens * 10;
  if(this.options.FocusStrength){
    this.jamsAt = 91;
    this.jamResult = 'Fail';
    switch(this.options.FocusStrength){
      case 'Unfettered':
        if(ones == 9) this.PsyPhe = true;
      break;
      case 'Push': case 'True':
        this.PsyPhe = true;
      break;
    }
  }

  if(this.inqweapon.isRanged()
  && (this.mode == 'Semi' || this.mode == 'Full')
  && this.jamsAt > 94) {
    this.jamsAt = 94;
  }

  if(this.inqweapon.isRanged() || this.inqweapon.Class == 'Psychic'){
    if(die >= this.jamsAt) {
      var jamReport =  getLink(this.inqweapon.Name);
      jamReport += ' **' + getLink(this.jamResult) + '**';
      if(!/s$/.test(this.jamResult)) jamReport += 's';
      this.warning = jamReport + '!';
      this.autoFail = true;
    }
  }
}
