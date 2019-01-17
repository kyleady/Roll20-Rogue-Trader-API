INQTest.prototype.getStats = function(inqcharacter){
  if(!this.Characteristic || (!inqcharacter && !this.PartyStat)) return;
  if(!this.PartyStat){
    this.Stat = inqcharacter.Attributes[this.Characteristic];
    this.Unnatural = inqcharacter.Attributes['Unnatural ' + this.Characteristic];
  } else {
    this.Stat = Number(attributeValue(this.Characteristic));
    this.Unnatural = Number(attributeValue('Unnatural ' + this.Characteristic, {alert: false}));
  }
}
