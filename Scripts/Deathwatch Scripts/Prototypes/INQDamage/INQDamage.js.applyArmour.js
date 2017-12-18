INQDamage.prototype.applyArmour = function() {
  var damage = Number(this.Dam.get('current'));
  var hitLocation = getHitLocation(this.TensLoc, this.OnesLoc, this.targetType);
  var armour = Number(attributeValue('Armour_' + hitLocation, {characterid: this.inqcharacter.ObjID, graphicid: this.inqcharacter.GraphicID}));
  var pen = Number(this.Pen.get('current'));
  var primAttack = Number(this.Prim.get('current')) > 0;
  if(!damage) damage = 0;
  if(!armour) armour = 0;
  if(!pen) pen = 0;
  if(primAttack > 0) armour *= 2;
  if(this.primArmour) armour /= 2;
  armour = Math.round(armour);
  armour = this.ignoreNaturalArmour(armour);
  armour -= pen;
  if(this.targetType == 'starship' && pen > 0) armour = 0;
  if(armour < 0) armour = 0;
  damage -= armour;
  if(damage < 0) damage = 0;
  this.damage = damage;
}
