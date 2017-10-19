INQWeaponParser.prototype.parseRequisition = function(content){
  var matches = content.match(/^\s*(\d+)\s*$/);
  if(matches){
    this.Requisition = Number(matches[1]);
  } else {
    whisper("Invalid Requisition")
  }
}
