INQAttack.prototype.prepareAttack = function(){
  var special = new INQQtt(this.inquse);
  special.beforeDamage();
  if(this.inquse.inqweapon.Class == 'Melee') this.inquse.inqweapon.Damage.Modifier += this.inquse.SB;
  if(this.inquse.hits) {
    this.hordeDamage = this.inquse.hits;
    this.hordeDamage *= this.inquse.hordeDamageMultiplier;
    this.hordeDamage += this.inquse.hordeDamage;
    attributeValue('Hits', {setTo: this.hordeDamage});
    attributeValue('Hits', {setTo: this.hordeDamage, max: true});
  }
}
