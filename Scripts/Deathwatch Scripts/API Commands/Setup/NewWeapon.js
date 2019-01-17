function newWeapon() {
  var inqweapon = new INQWeapon();
  inqweapon.toHandoutObj();
  whisper('A *' + inqweapon.toLink() + '* was created.');
}

on('ready',function(){
  CentralInput.addCMD(/^!\s*new\s*weapon\s*$/i, newWeapon);
});
