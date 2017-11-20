INQQtt.prototype.indirect = function(){
  var inqweapon = this.inquse.inqweapon;
  var indirect = inqweapon.has('Indirect');
  if(indirect){
    for(var value of indirect){
      if(Number(value.Name)) this.inquse.scatter = value.Name;
    }
  }
}
