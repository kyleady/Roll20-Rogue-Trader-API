INQDamage.prototype.applyToughness = function() {
  if(this.targetType != 'character') return;
  this.damage += Math.min(this.Fell.get('current'), this.inqcharacter.Attributes['Unnatural T']);
  this.damage -= this.inqcharacter.bonus('T');
  let hitLocation = getHitLocation(this.TensLoc, this.OnesLoc, this.targetType);
  if(hitLocation.length >= 2) {
    hitLocation = `${hitLocation[1]}${hitLocation[0].toLowerCase()}`;
  }
  
  this.damage -= this.inqcharacter.Attributes[`${hitLocation}Total`];
  if(this.damage < 0) this.damage = 0;
}
