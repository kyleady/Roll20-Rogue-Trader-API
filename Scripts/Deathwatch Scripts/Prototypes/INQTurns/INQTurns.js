function INQTurns(){
  //get the JSON string of the turn order and make it into an array
  if(!Campaign().get("turnorder")){
    //We check to make sure that the turnorder isn't just an empty string first. If it is treat it like an empty array.
    this.turnorder = [];
  } else {
    //otherwise turn the turn order into an array
    this.turnorder = carefulParse(Campaign().get("turnorder")) || {};
  }
}
