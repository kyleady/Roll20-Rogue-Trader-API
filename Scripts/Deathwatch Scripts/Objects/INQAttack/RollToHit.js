INQAttack = INQAttack || {};
INQAttack.rollToHit = function(){
  //calculate the base roll to hit
  INQAttack.calcToHit();
  //determine the weapon's firing mode
  INQAttack.getFiringMode();
  //make the roll to hit
  INQAttack.d100 = randomInteger(100);
  //was there a crit?
  if(INQAttack.d100 == 100){
    INQAttack.Reports.Crit = "[Critical Failure!](!This Isn't Anything Yet)";
  } else if(INQAttack.d100 == 1) {
    INQAttack.Reports.Crit = "[Critical Success!](!This Isn't Anything Yet)";
  }
  //determine the number of hits based on the roll to hit and firing mode
  INQAttack.calcHits();
  //show the roll to hit
  INQAttack.Reports.toHit = "&{template:default} ";
  INQAttack.Reports.toHit += "{{name=<strong>" + INQAttack.stat +  "</strong>: " + INQAttack.inqcharacter.Name + "}} ";
  if(INQAttack.inqweapon.FocusSkill){
    INQAttack.Reports.toHit += "{{Skill=" + getLink(INQAttack.inqweapon.FocusSkill) + "}} ";
  }
  INQAttack.Reports.toHit += "{{Successes=[[(" + INQAttack.toHit.toString() + " - (" + INQAttack.d100.toString() + ") )/10]]}} ";
  INQAttack.Reports.toHit += "{{Unnatural= [[" + INQAttack.unnaturalSuccesses.toString() + "]]}} ";
  INQAttack.Reports.toHit += "{{Hits= [[" + INQAttack.hits.toString() + "]]}}";
}
