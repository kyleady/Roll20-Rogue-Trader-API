INQQtt.prototype.indirect = function(){
  var inqweapon = this.inquse.inqweapon;
  var indirect = inqweapon.has('Indirect');
  if(indirect){
    var total = this.getTotal(indirect);
    this.inquse.indirect = total;
  }
}
