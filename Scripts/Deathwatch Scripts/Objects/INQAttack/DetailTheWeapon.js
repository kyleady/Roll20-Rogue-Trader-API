//be sure the inqattack object exists before we start working with it
INQAttack_old = INQAttack_old || {};
//completely detail the weapon using ammo and character
//returns true if nothing went wrong
//returns false if something went wrong
INQAttack_old.detailTheWeapon = function(callback){
  var weaponPromise = new Promise(function(resolve){
    //get the weapon base
    INQAttack_old.getWeapon(function(valid){
      resolve(valid);
    });
  });
  weaponPromise.catch(function(e){log(e)});
  weaponPromise.then(function(valid){
    var ammoPromise = new Promise(function(resolve){
      if(!valid) return resolve(false);
      //add in the special ammo
      INQAttack_old.getSpecialAmmo(function(validAmmo){
        resolve(validAmmo);
      });
    });
    ammoPromise.catch(function(e){log(e)});
    ammoPromise.then(function(validAmmo){
      if(validAmmo) {
        //overwrite any detail with user options
        INQAttack_old.customizeWeapon();
        //apply the special rules that affect the toHit roll
        INQAttack_old.accountForHitsSpecialRules();
        //apply the special rules that affect the damage roll
        INQAttack_old.accountForDamageSpecialRules();
        //determine the character's effective psy rating
        INQAttack_old.calcEffectivePsyRating();
        //apply that psy rating to the weapon
        INQAttack_old.inqweapon.setPR(INQAttack_old.PsyRating);
        //apply the strength bonus of the character to the weapon
        INQAttack_old.inqweapon.setSB(INQAttack_old.inqcharacter.bonus("S"));
      }
      //the weapon was fully customized
      if(typeof callback == 'function'){
        callback(validAmmo);
      }
    });
  });
}
