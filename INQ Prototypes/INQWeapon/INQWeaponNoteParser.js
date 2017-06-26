//takes the a weapon note from a character sheet and turns it into the INQWeapon Prototype
function INQWeaponNoteParser(){
  this.parse = function(text){
    var inqlink = new INQLink(text);
    this.Name = inqlink.Name.trim();
    var details = [];
    _.each(inqlink.Groups, function(group){
      _.each(group.split(/\s*(?:;|,)\s*/), function(detail){
        details.push(detail);
      });
    });
    this.parseDetails(details);
    log(this)
  }

  this.parseClass = function(detail){
    this.Class = detail.toTitleCase();
  }

  this.parseRange = function(detail){
    this.Range = Number(detail.match(/^(\d+)\s*k?m$/)[1]);
  }

  this.parseRoF = function(detail){
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

  this.parseDamage = function(detail){
    var DamageMatches = detail.match(/^(\d*)\s*(?:d|D)\s*(\d+)\s*\+?\s*(\d*)\s*(I|R|E|X|)$/);
    if(DamageMatches[1] != ""){
      this.DiceNumber = Number(DamageMatches[1]);
    } else {
      this.DiceNumber = 1;
    }
    this.DiceType = Number(DamageMatches[2]);
    if(DamageMatches[3] != ""){
      this.DamageBase = Number(DamageMatches[3]);
    }
    if(DamageMatches[4] != ""){
      this.DamageType = new INQLink(DamageMatches[4]);
    }
  }

  this.parsePenetration = function(detail){
     var PenMatches = detail.match(/^Pen(?:etration)?:?\s*(?:(\d*)\s*(?:d|D)\s*(\d+)\s*\+?)?\s*(\d*)$/);

     if(PenMatches[1] && Number(PenMatches[1])){
       this.PenDiceNumber = Number(PenMatches[1]);
     }
     if(PenMatches[2] && Number(PenMatches[2])){
       this.PenDiceType = Number(PenMatches[2]);
     }
     if(PenMatches[3] && Number(PenMatches[3])){
       this.Penetration = Number(PenMatches[3]);
     }
  }

  this.parseClip = function(detail){
    this.Clip = Number(detail.match(/^Clip\s*(\d+)$/)[1]);
  }

  this.parseReload = function(detail){
    var ReloadMatches = detail.match(/^(?:Reload|Rld):?\s*(\d*)\s*(Free|Half|Full)$/i);
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
    }
    if(ReloadMatches[1] != ""){
      this.Reload *= Number(ReloadMatches[1]);
    }
  }

  this.parseDetails = function(details){
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
      } else if(/^\d*\s*(d|D)\s*\d+\s*\+?\s*\d*\s*(I|R|E|X|)$/.test(detail)) {
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
}
