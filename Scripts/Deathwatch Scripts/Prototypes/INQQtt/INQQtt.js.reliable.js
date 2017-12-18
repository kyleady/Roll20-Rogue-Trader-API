INQQtt.prototype.reliable = function(){
  var inqweapon = this.inquse.inqweapon;
  if(inqweapon.has('Reliable')){
    this.inquse.jamsAt = 100;
  }
}
