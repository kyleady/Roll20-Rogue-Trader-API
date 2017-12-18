INQQtt.prototype.damageType = function(){
  var inqweapon = this.inquse.inqweapon;
  var type = inqweapon.has(/Dam(age)?\s*Type/i);
  if(type){
    _.each(type, function(value){
      inqweapon.DamageType = new INQLink(value.Name.replace('=',''));
    });
  }
}
