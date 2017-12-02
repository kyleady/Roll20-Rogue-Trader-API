INQQtt.prototype.tearingFleshRender = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(inqweapon.has('Tearing')){
    this.inquse.dropDice = 1;
    inqweapon.Damage.DiceNumber++;
    if(inqcharacter.has('Flesh Render', 'Talents') && inqweapon.Class == 'Melee'){
      this.inquse.dropDice++;
      inqweapon.Damage.DiceNumber++;
    }
  }
}
