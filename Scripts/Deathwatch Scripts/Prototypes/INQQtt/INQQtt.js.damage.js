INQQtt.prototype.damage = function(){
  var inqweapon = this.inquse.inqweapon;
  var dam = inqweapon.has(/dam(age)?/i);
  if(dam){
    _.each(dam, function(value){
      if(/=/.test(value.Name)){
        var text = value.Name.replace('=', '');
        var formula = new INQFormula(text);
        inqweapon.Damage = formula;
      }
    });

    var total = this.getTotal(dam, 0);
    inqweapon.Damage.Modifier += total;
  }
}
