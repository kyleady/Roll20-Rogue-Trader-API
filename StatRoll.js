//rolls a D100 against the designated stat and outputs the number of successes
//takes into account corresponding unnatural bonuses
//negative success equals the number of failures

//matches[0] is the same as msg.content
//matches[1] is either "gm" or null
//matches[2] is that name of the stat being rolled (it won't always be capitalized properly) and is null if no modifier is included
//matches[3] is the sign of the modifier and is null if no modifier is included
//matches[4] is the absolute value of the modifier and is null if no modifier is included
function statRoll(matches, msg, options){
  //if matches[1] exists, then the user specified that they want this to be a private whisper to the gm
  if(matches[1]){
      var whisperGM = "/w gm ";
  } else {
      var whisperGM = "";
  }

  //record the name of the stat without modification
  //capitalization modification should be done before this function
  var statName = matches[2];

  //did the player add a modifier?
  if(matches[3] && matches[4]){
    var modifier = Number(matches[3] + matches[4]);
  } else {
    var modifier = 0
  }

  //default to empty options
  options = options || {};

  //is the stat a public stat, shared by the entire party?
  if(options["partyStat"]){
    //overwrite msg.selected. Whatever was selected does not matter
    //we need one item in msg.selected to iterate over
    msg.selected = ["partyStat"];
  //otherwise, overwrite msg.selected if it is empty
  } else if(msg.selected == undefined || msg.selected.length <= 0){
    //make the seleced array include the default character
    msg.selected = [defaultCharacter(msg.playerid)];
    //if there is no default character, just quit
    if(msg.selected[0] == undefined){return;}
  }

  //work through each selected character
  _.each(msg.selected, function(obj){
    //first check if the selected characters are being overwritten with the party stat
    if(options["partyStat"]){
      var stat = attrValue(statName);
      var name = "";
    //normally msg.selected is just a list of object ids and types of the
    //objects you have selected. If this is the case, find the corresponding
    //character objects.
    } else if(obj._type && obj._type == "graphic"){
      var graphic = getObj("graphic", obj._id);
      //be sure the graphic exists
      if(graphic == undefined) {
          return whisper("graphic undefined");
      }
      var stat = attrValue(statName,{graphicid: obj._id});
      var unnatural_stat = attrValue("Unnatural " + statName,{graphicid: obj._id, alert: false});
      var name = graphic.get("name");
    //if using a default character, just accept the default character as the
    //the character we are working with
    } else if(obj.get("_type") == "character") {
      var stat = attrValue(statName,{characterid: obj.id});
      var unnatural_stat = attrValue("Unnatural " + statName,{characterid: obj.id, alert: false});
      var name = obj.get("name");
    }

    //be sure the stat exists
    if(stat == undefined){
      //attrValue should warn if something went wrong
      return;
    }

    //by default, don't include the unnatural bonus
    var unnatural_bonus = "";
    if(unnatural_stat != undefined){
      unnatural_bonus = "{{Unnatural= [[ceil((" + unnatural_stat + ")/2)]]}}";
    }

    //add a slight bit of formating to the name, if it exists
    if(name != ""){
      name = ": " + name;
    }

    //output the stat roll (whisperGM determines if everyone can see it or if it was sent privately to the GM);
    sendChat("player|" + msg.playerid , whisperGM + "&{template:default} {{name=<strong>" + statName +  "</strong>" + name + "}} {{Successes=[[((" + stat.toString() + "+" + modifier.toString() + "-D100)/10)]]}} "  + unnatural_bonus);
  });
}

function getProperStatName(statName){
  switch(statName.toLowerCase()){
    case "pr": case "pe":
      //replace pr with Per (due to conflicts with PsyRating(PR))
      return "Per";
    case "ws": case "bs":
      //capitalize every letter
      return statName.toUpperCase();
    case "int": case "in":
      return "It";
    case "fel":
      return "Fe";
    case "dam":
      return "Damage";
    case "pen":
      return "Penetration";
    case "prim":
      return "Primitive";
    case "fell":
      return "Felling";
    default:
      //most Attributes begin each word with a capital letter (also known as TitleCase)
      statName = statName.toTitleCase();
  }
  if(/^armour(\s*|_)\w\w?$/i.test(statName)){
      statName = statName.replace(/^Armour\s*/,"Armour_");
      return statName.replace(/_\w\w?$/, function(txt){return txt.toUpperCase();});
  }

  return statName;
}

//adds the commands after CentralInput has been initialized
on("ready", function() {
  //add the stat roller function to the Central Input list as a public command
  //inputs should appear like '!Fe+10' OR '!Ag ' OR '!gmS - 20  '
  CentralInput.addCMD(/^!\s*(gm)?\s*(WS|BS|S|T|Ag|It|Int|Wp|Pr|Per|Fe|Fel|Insanity|Corruption|Renown|Crew|Population|Moral)\s*(?:(\+|-)\s*(\d+)\s*)?$/i,function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    statRoll(matches,msg);
  },true);

  //lets the user quickly view their stats with modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(WS|BS|S|T|Ag|In|It|Int|Wp|Pr|Pe|Per|Fe|Fel|Fate|Insanity|Corruption|Renown|Crew|Wounds|Fatigue|Population|Moral|Hull|Void Shields|Turret|Manoeuvrability|Detection|Armour(?:\s*|_)(?:H|RA|LA|B|RL|LR|F|S|R|P|A))\s*(\?\s*\+|\?\s*-|\?\s*\*|\?\s*\/|=|\+\s*=|-\s*=|\*\s*=|\/\s*=)\s*(|\+|-)\s*(\d*|max|current)\s*$/i,function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    statHandler(matches,msg);
  },true);

  //similar to above, but shows the attribute without modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(WS|BS|S|T|Ag|It|In|Int|Wp|Pr|Pe|Per|Fe|Fel|Fate|Insanity|Corruption|Renown|Crew|Wounds|Fatigue|Population|Moral|Hull|Void Shields|Turret|Manoeuvrability|Detection|Armour(?:\s*|_)(?:H|RA|LA|B|RL|LR|F|S|R|P|A))\s*(\?)\s*$/i,function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    statHandler(matches,msg);
  },true);

  //Lets players make a Profit Factor Test
  CentralInput.addCMD(/^!\s*(gm)?\s*(Profit\s*Factor|P\s*F)\s*(?:(\+|-)\s*(\d+)\s*)?$/i,function(matches,msg){
    matches[2] = "Profit Factor";
    statRoll(matches,msg,{partyStat: true});
  },true);

  //Lets players freely view and edit cohesion with modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(Profit\s*Factor|P\s*F)\s*(\?\s*\+|\?\s*-|\?\s*\*|\?\s*\/|=|\+\s*=|-\s*=|\*\s*=|\/\s*=)\s*(|\+|-)\s*(\d+|current|max)\s*$/i, function(matches,msg){
    matches[2] = "Profit Factor";
    statHandler(matches,msg,{partyStat: true});
  }, true);
  //Lets players view cohesion without modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(Profit\s*Factor|P\s*F)\s*(\?)()()\s*$/i, function(matches,msg){
    matches[2] = "Profit Factor";
    statHandler(matches,msg,{partyStat: true});
  }, true);
});
