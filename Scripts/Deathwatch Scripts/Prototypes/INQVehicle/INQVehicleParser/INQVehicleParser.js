//takes the character object and turns it into the INQCharacter Prototype
function INQVehicleParser(){
  //the text that will be parsed
  this.Text = "";
}

INQVehicleParser.prototype = Object.create(INQVehicle.prototype);
INQVehicleParser.prototype.constructor = INQVehicleParser;
