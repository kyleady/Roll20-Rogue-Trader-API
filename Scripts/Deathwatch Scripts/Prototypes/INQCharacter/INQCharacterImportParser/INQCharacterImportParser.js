function INQCharacterImportParser(){
  this.StatNames = ["WS", "BS", "S", "T", "Ag", "It", "Per", "Wp", "Fe"];
}

INQCharacterImportParser.prototype = Object.create(INQCharacter.prototype);
INQCharacterImportParser.prototype.constructor = INQCharacterImportParser;
