INQQtt.prototype.overheats = function(){
  var inqweapon = this.inquse.inqweapon;
  if(inqweapon.has('Overheats')){
    this.inquse.jamResult = 'Overheats';
    this.inquse.jamsAt = 91;
  }
}
