INQUse.prototype.loadWeapon = function(weaponname, callback) {
  var inquse = this;
  var valid = inquse.getWeapon(weaponname);
  if(!valid) return callback(false);
  valid = inquse.getSpecialAmmo();
  if(!valid) return callback(false);

  var ammoPromise = new Promise(function(resolve){
    if(inquse.inqammo && inquse.inqammo.get && inquse.inqammo.get('_type') == 'handout'){
      inquse.inqammo = new INQWeapon(inquse.inqammo, function(){
        resolve(true);
      });
    } else {
      resolve(true);
    }
  });

  var weaponPromise = new Promise(function(resolve){
    if(inquse.inqweapon && inquse.inqweapon.get && inquse.inqweapon.get('_type') == 'handout'){
      inquse.inqweapon = new INQWeapon(inquse.inqweapon, function(){
        resolve(true);
      });
    } else {
      resolve(true);
    }
  });

  Promise.all([weaponPromise, ammoPromise]).then(function(valid){
    if(valid.includes(false)) return callback(false);
    inquse.applySpecialAmmo();
    inquse.inqweapon.set(inquse.options);
    callback(true);
  });
}
