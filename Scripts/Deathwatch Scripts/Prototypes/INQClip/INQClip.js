function INQClip(inqweapon, characterid, options){
  this.inqweapon = inqweapon;
  this.characterid = characterid;
  if(typeof options != 'object') options = {};
  this.options = options;
  this.getName();
}
