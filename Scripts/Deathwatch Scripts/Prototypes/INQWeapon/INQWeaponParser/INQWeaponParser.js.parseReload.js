INQWeaponParser.prototype.parseReload = function(content){
  var matches = content.match(/^\s*(\d*)\s*(Free|Half|Full|-|–|—)(\s*Actions?)?\s*$/i);
  if(matches){
    switch(matches[2].toTitleCase()){
      case 'Free':
        this.Reload = 0;
      break;
      case 'Half':
        this.Reload = 0.5;
      break;
      case 'Full':
        this.Reload = 1;
      break;
      default:
        this.Reload = -1;
    }
    if(matches[1]){
      this.Reload *= Number(matches[1]);
    }
  } else {
    whisper('Invalid Reload');
  }
}
