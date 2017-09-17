INQAttack = INQAttack || {};
INQAttack.recordAmmo = function(){
  //use the name of the weapon to construct the name of the ammo
  var AmmoName = "Ammo - " + INQAttack.inqweapon.Name;
  if(INQAttack.inqammo){
    AmmoName += " (" + INQAttack.inqammo.Name + ")";
  }
  //how much ammo is left for this weapon?
  INQAttack.AmmoLeft = attributeValue(AmmoName, {
    characterid: INQAttack.inqcharacter.ObjID,
    graphicid: INQAttack.inqcharacter.GraphicID,
    alert: false}
  );
  //check if this ammo tracker exists yet
  if(INQAttack.AmmoLeft == undefined){
    //create a brand new clip
    attributeValue(AmmoName, {
      setTo: INQAttack.inqweapon.Clip,
      characterid: INQAttack.inqcharacter.ObjID,
      graphicid: INQAttack.inqcharacter.GraphicID,
      alert: false}
    );
    //minus the shots fired from the max
    INQAttack.AmmoLeft = INQAttack.inqweapon.Clip - INQAttack.shotsFired;
  } else {
    //minus the shots fired from the clip
    INQAttack.AmmoLeft -= INQAttack.shotsFired;
  }
  //be sure you can even spend this much ammo
  if(INQAttack.AmmoLeft < 0){
    whisper("Not enough ammo to fire on " + INQAttack.options.RoF, INQAttack.msg.playerid);
    return false;
  }
  //record the resulting clip
  attributeValue(AmmoName, {
    setTo: INQAttack.AmmoLeft,
    characterid: INQAttack.inqcharacter.ObjID,
    graphicid: INQAttack.inqcharacter.GraphicID,
    alert: false}
  );

  return true;
}
