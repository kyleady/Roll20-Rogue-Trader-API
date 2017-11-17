INQQtt.prototype.hammerBlow = function(inqweapon, inqcharacter, RoF){
  if(/^\s*all\s*out\s*$/i.test(RoF) && inqcharacter.has('Hammer Blow', 'Talents')){
    inqweapon.Penetration.Modofier += Math.ceil(inqcharacter.bonus('S')/2);
    var concussive2 = new INQLink('Concussive(2)');
    inqweapon.Special.push(concussive2);
  }
}
