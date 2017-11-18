INQQtt.prototype.hammerBlow = function(){
  var inqcharacter = this.inquse.inqcharacter;
  var inqweapon = this.inquse.inqweapon;
  var RoF = this.inquse.options.RoF;
  if(inqcharacter.has('Hammer Blow', 'Talents') && /^\s*all\s*out\s*$/i.test(RoF)){
    inqweapon.Penetration.Modofier += Math.ceil(inqcharacter.bonus('S')/2);
    var concussive2 = new INQLink('Concussive(2)');
    inqweapon.Special.push(concussive2);
  }
}
