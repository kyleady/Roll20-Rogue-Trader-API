INQAttack = INQAttack || {};
INQAttack.reportAmmo = function(){
  //write a report on the weapon
  INQAttack.Reports.Weapon = "";
  INQAttack.Reports.Weapon += "<br><strong>Weapon</strong>: " + INQAttack.inqweapon.toLink();
  if(INQAttack.inqammo){
    INQAttack.Reports.Weapon += "<br><strong>Ammo</strong>: " + INQAttack.inqammo.toLink();
  }
  INQAttack.Reports.Weapon += "<br><strong>Mode</strong>: " + INQAttack.options.RoF.toTitleCase();
  if(INQAttack.inqweapon.Class == "Psychic"){
    INQAttack.Reports.Weapon += "<br><strong>Psy Rating</strong>: " + INQAttack.PsyRating.toString();
    INQAttack.Reports.Weapon += "<br><strong>" + getLink("Psychic Phenomena") + "</strong>: [Roll](!find Psychic Phenomena&#13;/r d100)";
  }
  if(INQAttack.AmmoLeft != undefined){
    INQAttack.Reports.Weapon += "<br><strong>Ammo</strong>: " + INQAttack.AmmoLeft + "/" + INQAttack.inqweapon.Clip;
  }
}
