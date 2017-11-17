INQUse.prototype.getSpecialAmmo = function(){
  if(!this.options.Ammo && !this.options.customAmmo) return true;
  if(this.options.customAmmo){
    this.inqammo = new INQWeapon(this.options.customAmmo);
    return true;
  }

  var clipname = this.options.Ammo;
  this.options.Ammo = '$';
  var clips = suggestCMD('!useweapon ' + this.inqweapon.Name + JSON.stringify(this.options), clipname, this.playerid);
  if(!clips) return false;
  this.inqammo = clips[0];
  return true;
}
