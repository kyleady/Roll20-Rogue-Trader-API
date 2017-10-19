//Dark Heresy records the total characteristic values, while I need to know
//just the Unnatural characteristics
INQCharacterImportParser.prototype.adjustBonus = function(){
  for(var i = 0; i < StatNames.length; i++){
    if(this.Attributes["Unnatural " + StatNames[i]] > 0){
      this.Attributes["Unnatural " + StatNames[i]] -= Math.floor(this.Attributes[StatNames[i]]/10);
    }
  }
}
