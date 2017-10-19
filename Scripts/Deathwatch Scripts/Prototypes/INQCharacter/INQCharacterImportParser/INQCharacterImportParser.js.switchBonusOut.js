INQCharacterImportParser.prototype.switchBonusOut = function(){
  for(var i = 0; i < StatNames.length; i++){
    this.Attributes[StatNames[i]] = this.Attributes["Unnatural " + StatNames[i]];
    this.Attributes["Unnatural " + StatNames[i]] = 0;
  }
}
