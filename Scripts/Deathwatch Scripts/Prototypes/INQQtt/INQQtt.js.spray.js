INQQtt.prototype.spray = function(){
  var inqweapon = this.inquse.inqweapon;
  var PR = this.inquse.PR;
  var SB = this.inquse.SB;
  if(inqweapon.has('Spray')){
    var hits = Math.ceil(inqweapon.Range.roll({PR: PR, SB: SB})/4) + randomInteger(5);
    this.inquse.hordeDamageMultiplier *= hits;
    if(inqweapon.Class != 'Psychic') this.inquse.autoHit = true;
  }
}
