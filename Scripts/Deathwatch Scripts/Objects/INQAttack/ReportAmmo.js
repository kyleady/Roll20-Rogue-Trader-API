INQAttack_old = INQAttack_old || {};
INQAttack_old.reportAmmo = function(){
  //write a report on the weapon
  INQAttack_old.Reports.Weapon = "";
  INQAttack_old.Reports.Weapon += "<br><strong>Weapon</strong>: " + INQAttack_old.inqweapon.toLink();
  if(INQAttack_old.inqammo){
    INQAttack_old.Reports.Weapon += "<br><strong>Ammo</strong>: " + INQAttack_old.inqammo.toLink();
  }
  INQAttack_old.Reports.Weapon += "<br><strong>Mode</strong>: " + INQAttack_old.options.RoF.toTitleCase();
  if(INQAttack_old.inqweapon.Class == "Psychic"){
    INQAttack_old.Reports.Weapon += "<br><strong>Psy Rating</strong>: " + INQAttack_old.PsyRating.toString();
    INQAttack_old.Reports.Weapon += "<br><strong>" + getLink("Psychic Phenomena") + "</strong>: [Roll](!find Psychic Phenomena&#13;/r d100)";
  }
  if(INQAttack_old.AmmoLeft != undefined){
    INQAttack_old.Reports.Weapon += "<br><strong>Ammo</strong>: " + INQAttack_old.AmmoLeft + "/" + INQAttack_old.inqweapon.Clip;
  }
}
