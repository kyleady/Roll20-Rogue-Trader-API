//Dark Heresy records the total damage for weapons in their Damage Base
//including Str Bonus for Melee Weapons and talents
INQCharacterImportParser.prototype.adjustWeapons = function(){
  for(var i = 0; i < this.List.Weapons.length; i++){
    var weapon = this.List.Weapons[i];
    if(weapon.Class == "Melee"){
      weapon.DamageBase -= this.bonus("S");
      if(weapon.has("Fist")){
        weapon.DamageBase -= this.bonus("S");
      }
      if(this.has("Crushing Blow", "Talents")){
        weapon.DamageBase -= 2;
      }
    } else if(this.has("Mighty Shot", "Talents")){
      weapon.DamageBase -= 2;
    }
    weapon.Name = weapon.Name.toTitleCase();
  }
}
