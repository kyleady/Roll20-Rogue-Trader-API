INQQtt.prototype.hammerBlow = function(){
  var inqcharacter = this.inquse.inqcharacter;
  var inqweapon = this.inquse.inqweapon;
  var RoF = this.inquse.options.RoF;
  var SB = this.inquse.SB;
  if(inqcharacter.has('Hammer Blow', 'Talents') && /^\s*all\s*out\s*(attack)?\s*$/i.test(RoF)){
    inqweapon.Penetration.Modifier += Math.ceil(SB/2);
    inqweapon.set({Special: 'Concussive(2)'});
  }
}
