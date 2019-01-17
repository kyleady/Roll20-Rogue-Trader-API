INQQtt.prototype.penetration = function(){
  var inqweapon = this.inquse.inqweapon;
  var pen = inqweapon.has(/Pen(etration)?/i);
  if(!pen) return;
  _.each(pen, function(value){
    if(/=/.test(value.Name)){
      var text = value.Name.replace('=', '');
      var formula = new INQFormula(text);
      inqweapon.Penetration = formula;
    }
  });

  var total = this.getTotal(pen, 0);
  log(`Pen(${total})`);
  inqweapon.Penetration.Modifier += total;
}
