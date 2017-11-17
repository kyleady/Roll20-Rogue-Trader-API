INQUse.prototype.getWeapon = function(weaponname){
  if(this.options.custom){
    this.inqweapon = new INQWeapon(this.options.custom);
    return true;
  }

  var weapons = suggestCMD('!useweapon $' + JSON.stringify(this.options), weaponname, this.playerid);
  if(!weapons) return false;
  this.inqweapon = weapons[0];
  return true;
}
