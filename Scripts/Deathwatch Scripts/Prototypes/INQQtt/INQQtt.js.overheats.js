INQQtt.prototype.overheats = function(){
  var inqweapon = this.inquse.inqweapon;
  if(!inqweapon.has('Overheats')) return;
  log('Overheats');
  this.inquse.jamResult = 'Overheats';
  this.inquse.jamsAt = 91;
}
