INQClip.prototype.getName = function(weapon){
  if(!this.inqweapon) return;
  this.name = 'Ammo - ';
  if(typeof this.inqweapon == 'string'){
    this.name += this.inqweapon;
  } else {
    this.name += this.inqweapon.Name;
  }

  if(this.options.inqammo) {
    this.name += ' (';
    if(typeof this.options.inqammo == 'string'){
      this.name += this.options.inqammo;
    } else {
      this.name += this.options.inqammo.Name;
    }
    this.name += ')';
  }
}
