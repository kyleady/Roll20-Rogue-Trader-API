//toggles whether or not each selected graphic is frenzied and modifies their
//stats accordingly using the statHandler function
function getFrenzied(matches,msg){
  //if nothing was selected, search for a default character
  if(msg.selected == undefined || msg.selected.length <= 0){
    //make the seleced array include the default character
    msg.selected = [defaultCharacter(msg.playerid)];
    //if there is no default character, just quit
    if(msg.selected[0] == undefined){return;}
  }
  //we will be editting the current stat of characters only
  matches[1] = "";
  _.each(msg.selected,function(obj){
    //edit the characters one a time
    msg.selected = [obj];

    //is the creature frenzied already?
    var graphic = getObj("graphic",obj._id);
    if(graphic.get("status_red")){
      graphic.set("status_red",false);
      //reverse all of the stat modifications with a minus sign
      matches[4] = "-";
      whisper(graphic.get("name") + " is no longer frenzied.",msg.playerid);
    } else {
      graphic.set("status_red",true);
      //apply all of the stat modifications normally
      matches[4] = "";
      whisper(graphic.get("name") + " is frenzied!",msg.playerid);
    }

    //increased stats
    matches[2] = "WS";
    matches[3] = "+=";
    matches[5] = "10";
    statHandler(matches,msg,{show: false});
    matches[2] = "S";
    statHandler(matches,msg,{show: false});
    matches[2] = "T";
    statHandler(matches,msg,{show: false});
    matches[2] = "Wp";
    statHandler(matches,msg,{show: false});

    //decreased stats
    matches[2] = "BS";
    matches[3] = "-=";
    matches[5] = "20";
    statHandler(matches,msg,{show: false});
    matches[2] = "It";
    statHandler(matches,msg,{show: false});
  });
}

//adds the commands after CentralInput has been initialized
on("ready", function() {
  //Lets players make characters frenzied
  CentralInput.addCMD(/^!\s*Frenzy\s*$/i,getFrenzied,true);
});
