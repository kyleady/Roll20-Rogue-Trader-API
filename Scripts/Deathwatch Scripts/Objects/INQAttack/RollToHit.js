INQAttack_old = INQAttack_old || {};
INQAttack_old.rollToHit = function(){
  //calculate the base roll to hit
  INQAttack_old.calcToHit();
  //determine the weapon's firing mode
  INQAttack_old.getFiringMode();
  //make the roll to hit
  INQAttack_old.d100 = randomInteger(100);
  //was there a crit?
  if(INQAttack_old.d100 == 100){
    INQAttack_old.Reports.Crit = "[Critical Failure!](!This Isn't Anything Yet)";
  } else if(INQAttack_old.d100 == 1) {
    INQAttack_old.Reports.Crit = "[Critical Success!](!This Isn't Anything Yet)";
  }
  //determine the number of hits based on the roll to hit and firing mode
  INQAttack_old.calcHits();
  //show the roll to hit
  INQAttack_old.Reports.toHit = "&{template:default} ";
  INQAttack_old.Reports.toHit += "{{name=<strong>" + INQAttack_old.stat +  "</strong>: " + INQAttack_old.inqcharacter.Name + "}} ";
  if(INQAttack_old.inqweapon.FocusSkill){
    INQAttack_old.Reports.toHit += "{{Skill=" + getLink(INQAttack_old.inqweapon.FocusSkill) + "}} ";
  }
  INQAttack_old.Reports.toHit += "{{Successes=[[(" + INQAttack_old.toHit.toString() + " - (" + INQAttack_old.d100.toString() + ") )/10]]}} ";
  INQAttack_old.Reports.toHit += "{{Unnatural= [[" + INQAttack_old.unnaturalSuccesses.toString() + "]]}} ";
  INQAttack_old.Reports.toHit += "{{Hits= [[" + INQAttack_old.hits.toString() + "]]}}";
}
