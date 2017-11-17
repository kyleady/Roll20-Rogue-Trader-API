INQQtt.prototype.tearingFleshRender = function(inqweapon, inqcharcter){
  if(inqweapon.has('Tearing')){
    this.dropDice = 1;
    inqweapon.Damage.DiceNumber++;
    if(inqcharacter.has('Flesh Render', 'Talents')){
      this.dropDice++;
      inqweapon.Damage.DiceNumber++;
    }
  }
}
