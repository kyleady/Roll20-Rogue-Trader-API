INQQtt.prototype.blast = function(){
  var inqweapon = this.inquse.inqweapon;
  var inquse = this.inquse;
  var blast = inqweapon.has('Blast');
  if(blast){
    var total = this.getTotal(blast);
    inquse.hordeDamageMultiplier *= total;
  }
}
