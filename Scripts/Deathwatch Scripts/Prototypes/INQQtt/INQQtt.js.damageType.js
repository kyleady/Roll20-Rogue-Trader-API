INQQtt.prototype.damageType = function(inqweapon){
  var type = inqweapon.has('DamageType');
  if(type){
    _.each(type, function(value){
      inqweapon.DamageType = new INQLink(value.Name.replace('=',''));
    });
  }
}
