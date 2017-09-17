INQAttack = INQAttack || {};
//parse the special ammo and use it to customize the inqweaon
INQAttack.useAmmo = function(ammo){
  //parse the special ammunition
  INQAttack.inqammo = new INQWeapon(ammo);
  //only add the special rules of the ammo to the inqweapon, we want every
  //modification to be highly visible to the player
  for(var k in INQAttack.inqammo){
    if(k == "Name" || k == "ObjID" || k == "ObjType" || k == "DamageType"){continue;}
    if(INQAttack.inqammo[k] == INQAttack.inqammo.__proto__[k]){continue;}
    if(Array.isArray(INQAttack.inqammo[k])){
      INQAttack.inqweapon[k] = INQAttack.inqweapon[k].concat(INQAttack.inqammo[k]);
    } else {
      INQAttack.inqweapon[k] = INQAttack.inqammo[k];
    }
  }
}
