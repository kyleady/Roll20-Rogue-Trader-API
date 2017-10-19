//save the turn order in the Campaign
INQTurns.prototype.save = function(){
  Campaign().set("turnorder", JSON.stringify(this.turnorder));
}
