INQAttack_old = INQAttack_old || {};
INQAttack_old.recordAmmo = function(){
  //use the name of the weapon to construct the name of the ammo
  var AmmoName = "Ammo - " + INQAttack_old.inqweapon.Name;
  if(INQAttack_old.inqammo){
    AmmoName += " (" + INQAttack_old.inqammo.Name + ")";
  }
  //how much ammo is left for this weapon?
  INQAttack_old.AmmoLeft = attributeValue(AmmoName, {
    characterid: INQAttack_old.inqcharacter.ObjID,
    graphicid: INQAttack_old.inqcharacter.GraphicID,
    alert: false}
  );
  //check if this ammo tracker exists yet
  if(INQAttack_old.AmmoLeft == undefined){
    //create a brand new clip
    attributeValue(AmmoName, {
      setTo: INQAttack_old.inqweapon.Clip,
      characterid: INQAttack_old.inqcharacter.ObjID,
      graphicid: INQAttack_old.inqcharacter.GraphicID,
      alert: false}
    );
    //minus the shots fired from the max
    INQAttack_old.AmmoLeft = INQAttack_old.inqweapon.Clip - INQAttack_old.shotsFired;
  } else {
    //minus the shots fired from the clip
    INQAttack_old.AmmoLeft -= INQAttack_old.shotsFired;
  }
  //be sure you can even spend this much ammo
  if(INQAttack_old.AmmoLeft < 0){
    whisper("Not enough ammo to fire on " + INQAttack_old.options.RoF, INQAttack_old.msg.playerid);
    return false;
  }
  //record the resulting clip
  attributeValue(AmmoName, {
    setTo: INQAttack_old.AmmoLeft,
    characterid: INQAttack_old.inqcharacter.ObjID,
    graphicid: INQAttack_old.inqcharacter.GraphicID,
    alert: false}
  );

  return true;
}
