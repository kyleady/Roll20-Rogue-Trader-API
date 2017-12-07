INQAttack_old = INQAttack_old || {};
//parse the special ammo and use it to customize the inqweaon
INQAttack_old.useAmmo = function(ammo, callback){
  var myPromise = new Promise(function(resolve){
    //parse the special ammunition
    INQAttack_old.inqammo = new INQWeapon(ammo, function(){
      resolve();
    });
  });
  myPromise.catch(function(e){log(e)});
  myPromise.then(function(){
    //only add the special rules of the ammo to the inqweapon, we want every
    //modification to be highly visible to the player
    for(var k in INQAttack_old.inqammo){
      if(k == "Name" || k == "ObjID" || k == "ObjType" || k == "DamageType"){continue;}
      if(INQAttack_old.inqammo[k] == INQAttack_old.inqammo.__proto__[k]){continue;}
      if(Array.isArray(INQAttack_old.inqammo[k])){
        INQAttack_old.inqweapon[k] = INQAttack_old.inqweapon[k].concat(INQAttack_old.inqammo[k]);
      } else {
        INQAttack_old.inqweapon[k] = INQAttack_old.inqammo[k];
      }
    }

    if(typeof callback == 'function'){
      callback(inqcharacter);
    }
  });
}
