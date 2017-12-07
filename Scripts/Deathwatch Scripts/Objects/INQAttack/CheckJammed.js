//be sure the inqattack object exists before we start working with it
INQAttack_old = INQAttack_old || {};

INQAttack_old.checkJammed = function(){
  var JamsAt = 101;
  var JamResult = "Jam";
  if(INQAttack_old.inqweapon.has("Overheats")){
    JamsAt = 91;
    JamResult = "Overheats";
  } else if(INQAttack_old.inqweapon.has("Unreliable")){
    JamsAt = 91;
  } else if(INQAttack_old.inqweapon.has("Reliable")){
    JamsAt = 100;
  } else if(INQAttack_old.stat == "BS"){
    if(INQAttack_old.mode == "Single"){
      JamsAt = 96;
    } else {
      JamsAt = 94;
    }
  }
  if(INQAttack_old.d100 >= JamsAt){
    var jamReport =  getLink(INQAttack_old.inqweapon.Name) + " **" + getLink(JamResult) + "**";
    if(!/s$/.test(JamResult)){
      jamReport += "s";
    }
    announce("/em " + jamReport + "!", "The");
    INQAttack_old.hits = 0;
  }
}
