INQQtt.prototype.spray = function(inqweapon){
  if(inqweapon.has('spray')){
    this.hordeDamageMultiplier *= Math.ceil(inqweapon.Range/4) + randomInteger(5);
    if(inqweapon.Class != 'Psychic') this.autoHit = true;
  }
}
