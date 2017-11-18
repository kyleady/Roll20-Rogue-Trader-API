INQQtt.prototype.marksman = function(){
  var inqweapon = this.inquse.inqweapon;
  var inqcharacter = this.inquse.inqcharacter;
  if(inqcharacter.has('Marksman', 'Talents')){
    if(this.inquse.Range == 'Long') {
      this.inquse.modifiers.push({Name: 'Marksman', Value: 10});
    } else if(this.inquse.Range == 'Extended') {
      this.inquse.modifiers.push({Name: 'Marksman', Value: 20});
    }
  }
}
