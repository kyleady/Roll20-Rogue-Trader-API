INQQtt.prototype.scatter = function(){
  var inqweapon = this.inquse.inqweapon;
  var range = this.inquse.range;
  if(inqweapon.has('Scatter')){
    if(range == 'Point Blank'){
      inqweapon.set({Special: 'Storm'});
    } else if(/(Extended|Extreme|Impossible)/.test(range)){
      inqweapon.set({Special: 'Primitive'});
    }
  }
}
