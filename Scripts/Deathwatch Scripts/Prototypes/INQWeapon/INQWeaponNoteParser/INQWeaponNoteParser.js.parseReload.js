INQWeaponNoteParser.prototype.parseReload = function(detail){
  var ReloadMatches = detail.match(/^(?:Reload|Rld):?\s*(\d*)\s*(-|–|—|Free|Half|Full)$/i);
  switch(ReloadMatches[2].toTitleCase()){
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
  if(ReloadMatches[1] != ""){
    this.Reload *= Number(ReloadMatches[1]);
  }
}
