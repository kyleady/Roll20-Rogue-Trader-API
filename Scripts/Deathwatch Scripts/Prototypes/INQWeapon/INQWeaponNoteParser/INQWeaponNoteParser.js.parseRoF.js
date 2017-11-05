INQWeaponNoteParser.prototype.parseRoF = function(detail){
  var Rates = detail.match(/[^\/]+/g);
  var rateRe = new RegExp('^' + INQFormula.regex() + '$', 'i');
  this.Single = Rates[0] == 'S';
  if(rateRe.test(Rates[1])) this.Semi = new INQFormula(Rates[1]);
  if(rateRe.test(Rates[2])) this.Full = new INQFormula(Rates[2]);
  if(this.Class == 'Melee') this.Class = 'Basic';
}
