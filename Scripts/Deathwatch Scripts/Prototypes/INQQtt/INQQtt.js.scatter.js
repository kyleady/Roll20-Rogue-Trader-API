INQQtt.prototype.scatter = function(){
  var inqweapon = this.inquse.inqweapon;
  var range = this.inquse.range;
  if(inqweapon.has('Scatter')){
    if(range == 'Point Blank'){
      this.inquse.hitsMultiplier *= 2;
    } else if(/(Long|Extended|Extreme|Impossible)/.test(range)){
      inqweapon.set({Special: 'Primitive'});
    }
  }
}
