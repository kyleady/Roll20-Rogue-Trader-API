//Dark Heresy records the total characteristic values, while I need to know
//just the Unnatural characteristics
INQCharacterImportParser.prototype.adjustBonus = function(){
  for(var stat of this.StatNames){
    if(this.Attributes["Unnatural " + stat] > 0){
      this.Attributes["Unnatural " + stat] -= Math.floor(this.Attributes[stat]/10);
    }
  }
}
