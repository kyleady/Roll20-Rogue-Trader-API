//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};

INQAttack.checkJammed = function(){
  var JamsAt = 101;
  var JamResult = "Jam";
  if(INQAttack.inqweapon.has("Overheats")){
    JamsAt = 91;
    JamResult = "Overheats";
  } else if(INQAttack.inqweapon.has("Unreliable")){
    JamsAt = 91;
  } else if(INQAttack.inqweapon.has("Reliable")){
    JamsAt = 100;
  } else if(INQAttack.stat == "BS"){
    if(INQAttack.mode == "Single"){
      JamsAt = 96;
    } else {
      JamsAt = 94;
    }
  }
  if(INQAttack.d100 >= JamsAt){
    var jamReport =  getLink(INQAttack.inqweapon.Name) + " **" + getLink(JamResult) + "**";
    if(!/s$/.test(JamResult)){
      jamReport += "s";
    }
    announce("/em " + jamReport + "!", "The");
    INQAttack.hits = 0;
  }
}
