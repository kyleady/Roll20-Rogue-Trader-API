INQCharacterImportParser.prototype.switchBonusOut = function(){
  for(var stat of this.StatNames){
    this.Attributes[stat] = this.Attributes["Unnatural " + stat];
    this.Attributes["Unnatural " + stat] = 0;
  }
}
