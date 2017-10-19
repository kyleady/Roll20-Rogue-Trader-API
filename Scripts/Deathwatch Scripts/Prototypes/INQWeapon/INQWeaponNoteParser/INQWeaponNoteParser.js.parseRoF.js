INQWeaponNoteParser.prototype.parseRoF = function(detail){
  var RoFmatches = detail.match(/^(S|-|–)\s*\/\s*(\d+|-|–)\s*\/\s*(\d+|-|–)$/);
  this.Single = RoFmatches[1] == "S";
  if(Number(RoFmatches[2])){
    this.Semi = Number(RoFmatches[2]);
  }
  if(Number(RoFmatches[3])){
    this.Full = Number(RoFmatches[3]);
  }
  //RoF means not a Melee weapon
  if(this.Class == "Melee"){
    this.Class = "Basic";
  }
}
