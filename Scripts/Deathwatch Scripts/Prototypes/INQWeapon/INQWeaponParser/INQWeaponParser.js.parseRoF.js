INQWeaponParser.prototype.parseRoF = function(content){
  var Rates = content.match(/[^\/]+/g);
  if(Rates.length != 3) return whisper('Invalid RoF');
  var rateRe = new RegExp('^' + INQFormula.regex() + '$', 'i');
  this.Single = Rates[0] == 'S';
  if(rateRe.test(Rates[1])) this.Semi = new INQFormula(Rates[1]);
  if(rateRe.test(Rates[2])) this.Full = new INQFormula(Rates[2]);
  if(!this.Single && this.Semi.onlyZero() && this.Full.onlyZero()) return whisper('Invalid RoF');
  if(this.Class == 'Melee') this.Class = 'Basic';
}
