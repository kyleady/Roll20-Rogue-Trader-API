INQAttack = INQAttack || {};

//try to spend ammo when making the shot
INQAttack.expendAmmunition = function(){
  //write a report on the weapon
  INQAttack.Reports.Weapon = "";
  INQAttack.Reports.Weapon += "<br><strong>Weapon</strong>: " + INQAttack.inqweapon.Name;
  INQAttack.Reports.Weapon += "<br><strong>Mode</strong>: " + INQAttack.mode + "(" + INQAttack.maxHits + ")";

  //be sure this weapon uses ammunition
  if(INQAttack.inqweapon.Clip > 0){
    //use the name of the weapon to construct the name of the ammo
    var AmmoName = INQAttack.inqweapon.Name + " Ammo";
    //how much ammo is left for this weapon?
    var Ammo = attrValue(AmmoName, {
      characterid: INQAttack.inqcharacter.ObjID,
      graphicid: INQAttack.inqcharacter.GraphicID,
      alert: false}
    );
    //check if this ammo tracker exists yet
    if(Ammo == undefined){
      //create a brand new clip and just minus the shots fired from the max
      Ammo = INQAttack.inqweapon.Clip - INQAttack.maxHits;
    } else {
      //minus the shots fired from the clip
      Ammo -= INQAttack.maxHits;
      //be sure you can even spend this much ammo
      if(Ammo < 0){
        whisper("Not enough ammo to fire on " + INQAttack.options.RoF, INQAttack.msg.playerid);
        return false;
      }
    }
    //record the resulting clip
    attrValue(AmmoName, {
      setTo: Ammo,
      characterid: INQAttack.inqcharacter.ObjID,
      graphicid: INQAttack.inqcharacter.GraphicID,
      alert: false}
    );
    //Report the remaining Ammo
    INQAttack.Reports.Weapon += "<br><strong>Ammo</strong>: " + Ammo + "/" + INQAttack.inqweapon.Clip;
  }
  //we made it this far, nothing went wrong
  return true;
}
