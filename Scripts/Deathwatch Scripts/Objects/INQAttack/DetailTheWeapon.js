//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};
//completely detail the weapon using ammo and character
//returns true if nothing went wrong
//returns false if something went wrong
INQAttack.detailTheWeapon = function(callback){
  var weaponPromise = new Promise(function(resolve){
    //get the weapon base
    INQAttack.getWeapon(function(valid){
      resolve(valid);
    });
  });
  weaponPromise.then(function(valid){
    var ammoPromise = new Promise(function(resolve){
      if(!valid) return resolve(false);
      //add in the special ammo
      INQAttack.getSpecialAmmo(function(validAmmo){
        resolve(validAmmo);
      });
    });
    ammoPromise.then(function(validAmmo){
      if(validAmmo) {
        //overwrite any detail with user options
        INQAttack.customizeWeapon();
        //apply the special rules that affect the toHit roll
        INQAttack.accountForHitsSpecialRules();
        //apply the special rules that affect the damage roll
        INQAttack.accountForDamageSpecialRules();
        //determine the character's effective psy rating
        INQAttack.calcEffectivePsyRating();
        //apply that psy rating to the weapon
        INQAttack.inqweapon.setPR(INQAttack.PsyRating);
        //apply the strength bonus of the character to the weapon
        INQAttack.inqweapon.setSB(INQAttack.inqcharacter.bonus("S"));
      }
      //the weapon was fully customized
      if(typeof callback == 'function'){
        callback(validAmmo);
      }
    });
  });
}
