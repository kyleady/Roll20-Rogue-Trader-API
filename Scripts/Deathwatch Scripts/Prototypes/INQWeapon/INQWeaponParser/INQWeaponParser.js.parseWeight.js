INQWeaponParser.prototype.parseWeight = function(content){
  var matches = content.match(/^\s*(\d+)(?:\.(\d+))?\s*(?:kg)?s?\s*$/i);
  if(matches){
    this.Weight = Number(matches[1]);
    if(matches[2]){
      var fraction = Number(matches[2]);
      while(fraction > 1){
        fraction /= 10;
      }
      this.Weight += fraction;
    }
  } else {
    whisper("Invalid Weight")
  }
}
