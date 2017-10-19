//takes the character object and turns it into the INQCharacter Prototype
function INQCharacterParser(){
  //the text that will be parsed
  this.Text = "";
}

INQCharacterParser.prototype = Object.create(INQCharacter.prototype);
INQCharacterParser.prototype.constructor = INQCharacterParser;
