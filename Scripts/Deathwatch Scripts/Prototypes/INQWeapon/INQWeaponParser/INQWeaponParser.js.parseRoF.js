INQWeaponParser.prototype.parseRoF = function(content){
  var Rates = content.match(/[^\/]+/g);
  var rateRe = new RegExp('^' + INQFormula.regex() + '$', 'i');
  this.Single = Rates[0] == 'S';
  if(rateRe.test(Rates[1])) this.Semi = new INQFormula(Rates[1]);
  if(rateRe.test(Rates[2])) this.Full = new INQFormula(Rates[2]);
  if(this.Class == 'Melee') this.Class = 'Basic';
}
