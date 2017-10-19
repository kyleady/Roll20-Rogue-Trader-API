INQWeaponNoteParser.prototype.parseDetails = function(details){
  //parse each detail of the weapon
  for(var i = 0; i < details.length; i++){
    var detail = details[i].trim();
    //class
    if(/^(melee|pistol|basic|heavy)$/i.test(detail)){
      this.parseClass(detail);
    //Range
    } else if(/^\d+\s*k?m$/i.test(detail)){
      this.parseRange(detail);
    //Rate of Fire
    } else if(/^(S|-|–)\s*\/\s*(\d+|-|–)\s*\/\s*(\d+|-|–)$/.test(detail)){
      this.parseRoF(detail);
    //Damage
    } else if(/^\d*\s*(d|D)\s*\d+\s*\+?\s*\d*/.test(detail)) {
      this.parseDamage(detail);
    //Penetration
    } else if(/^Pen(etration)?:?\s*(?:\d*\s*(?:d|D)\s*\d+\s*\+?)?\s*\d*$/.test(detail)){
      this.parsePenetration(detail);
    //Clip
    } else if(/^Clip\s*\d+$/i.test(detail)) {
      this.parseClip(detail);
    //Reload
    } else if(/^(?:Reload|Rld):?\s*(\d*)\s*(Free|Half|Full)$/i.test(detail)) {
      this.parseReload(detail);
    //Special Rules
    } else {
      this.Special.push(new INQLink(detail.trim().replace("[","(").replace("]",")")));
    }
  }
}
