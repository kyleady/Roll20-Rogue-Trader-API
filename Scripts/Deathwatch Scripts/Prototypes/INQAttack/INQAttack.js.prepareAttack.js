INQAttack.prototype.prepareAttack = function(){
  var special = new INQQtt(this.inquse);
  special.beforeDamage();
  if(this.inquse.inqweapon.Class == 'Melee') this.inquse.inqweapon.Damage.Modifier += this.inquse.SB;
  if(this.inquse.hits) {
    if(this.inquse.inqweapon.Class == 'Psychic') {
      this.hordeDamage = this.inquse.PR;
      if(this.inquse.inqweapon.has('Blast')) this.hordeDamage += randomInteger(10);
    } else {
      this.hordeDamage = this.inquse.hits;
      this.hordeDamage *= this.inquse.hordeDamageMultiplier;
      this.hordeDamage += this.inquse.hordeDamage;
    }

    attributeValue('Hits', {setTo: this.hordeDamage, max: true});
  }

  attributeValue('AttackerID', { setTo: this.inquse.inqcharacter.GraphicID, max: true });
}
