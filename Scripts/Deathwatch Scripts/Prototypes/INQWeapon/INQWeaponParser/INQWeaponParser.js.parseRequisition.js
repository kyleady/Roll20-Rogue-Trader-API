INQWeaponParser.prototype.parseRequisition = function(content){
  var matches = content.match(/^\s*(\d*)(|-|–|—)\s*$/);
  if(matches){
    if(matches[1]) this.Requisition = Number(matches[1]);
    if(matches[2]) this.Requisition = -1;
  } else {
    whisper('Invalid Requisition');
  }
}
