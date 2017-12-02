INQQtt.prototype.devastating = function(){
  var inqweapon = this.inquse.inqweapon;
  var devastating = inqweapon.has('Devastating');
  if(devastating){
    var total = this.getTotal(devastating);
    this.inquse.hordeDamage += total;
  }
}
