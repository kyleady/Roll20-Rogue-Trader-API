INQQtt.prototype.indirect = function(){
  var inqweapon = this.inquse.inqweapon;
  var modifiers = this.inquse.modifiers;
  var indirect = inqweapon.has('Indirect');
  if(indirect){
    var total = this.getTotal(indirect);
    this.inquse.indirect = total;
    modifiers.push({Name: 'Indirect', Value: -10});
  }
}
