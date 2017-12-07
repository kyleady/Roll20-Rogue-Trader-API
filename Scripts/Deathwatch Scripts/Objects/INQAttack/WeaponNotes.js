INQAttack_old = INQAttack_old || {};
//make a list of all of the weapon special abilities
INQAttack_old.weaponNotes = function(){
  var notes = "";
  _.each(INQAttack_old.inqweapon.Special, function(rule){
    notes += rule.toNote() + ", ";
  });
  //remove the last comma
  return notes.replace(/,\s*$/, "");
}
