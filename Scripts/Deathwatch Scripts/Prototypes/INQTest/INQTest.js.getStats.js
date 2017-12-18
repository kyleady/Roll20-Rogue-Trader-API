INQTest.prototype.getStats = function(inqcharacter){
  if(!this.Characteristic || !inqcharacter) return;
  if(!this.PartyStat){
    this.Stat = inqcharacter.Attributes[this.Characteristic];
    this.Unnatural = inqcharacter.Attributes['Unnatural ' + this.Characteristic];
  } else {
    this.Stat = attributeValue(this.Characteristic);
    this.Unnatural = attributeValue('Unnatural ' + this.Characteristic, {alert: false});
  }
}
