function INQUse(weaponname, options, character, graphic, playerid, callback){
  if(typeof options != 'object') options = {};
  this.options = options;
  this.playerid = playerid;
  var inquse = this;
  var attackerPromise = new Promise(function(resolve){
    return inquse.loadCharacter(character, graphic, resolve);
  });

  var defenderPromise = new Promise(function(resolve){
    return inquse.loadTarget(resolve);
  });

  var weaponPromise = new Promise(function(resolve){
    return inquse.loadWeapon(weaponname, resolve);
  });

  Promise.all([attackerPromise, defenderPromise, weaponPromise]).then(function(valid){
    if(valid.includes(false)) return callback(false);
    callback(inquse);
  });
}
