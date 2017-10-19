INQVehicleImportParser.prototype.getSpeeds = function(){
  var speed = this.Bio["Tactical Speed"] + "";
  log(typeof speed)
  var matches = speed.match(/(\d+)\s*m/);
  if(matches){
    this.Attributes["Tactical Speed"] = Number(matches[1]);
  }
  matches = speed.match(/(\d+)\s*(?:<[^>]+>)?AUs/);
  if(matches){
    this.Attributes["Aerial Speed"] = Number(matches[1]);
  }
}
