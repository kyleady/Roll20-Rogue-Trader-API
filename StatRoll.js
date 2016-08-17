//rolls a D100 against the designated stat and outputs the number of successes
//takes into account corresponding unnatural bonuses
//negative success equals the number of failures

//matches[0] is the same as msg.content
//matches[1] is either "gm" or null
//matches[2] is that name of the stat being rolled (it won't always be capitalized properly) and is null if no modifier is included
//matches[3] is the sign of the modifier and is null if no modifier is included
//matches[4] is the absolute value of the modifier and is null if no modifier is included
function statRoll(matches, msg){
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

  //find a default character for the player if nothing was selected
  if(msg.selected == undefined || msg.selected.length <= 0){
    //make the seleced array include the default character
    msg.selected = [defaultCharacter(msg.playerid)];
    //if there is no default character, just quit
    if(msg.selected[0] == undefined){return;}
  }

  //work through each selected character
  _.each(msg.selected, function(obj){
    //normally msg.selected is just a list of objectids and types of the
    //objects you have selected. If this is the case, find the corresponding
    //character objects.

    if(obj._type && obj._type == "graphic"){
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
    }else if(obj.get("_type") == "character") {
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

    //output the stat roll (whisperGM determines if everyone can see it or if it was sent privately to the GM);
    sendChat("player|" + msg.playerid , whisperGM + "&{template:default} {{name=<strong>" + statName +  "</strong>: " + name + "}} {{Successes=[[((" + stat.toString() + "+" + modifier.toString() + "-D100)/10)]]}} "  + unnatural_bonus);
  });
}

//rolls a D100 against the designated stat and outputs the number of successes
//negative success equals the number of failures

//matches[0] is the same as msg.content
//matches[1] is either "gm" or null
//matches[2] is that name of the stat being rolled (it won't always be capitalized properly) and is null if no modifier is included
//matches[3] is the sign of the modifier and is null if no modifier is included
//matches[4] is the absolute value of the modifier and is null if no modifier is included
function partyStatRoll(matches, msg){

    //quit early if there were no inputs
    if(matches == undefined || msg == undefined){
        //likely the CentralInput is attempting to test the function
        return whisper("statRoll() was run without any inputs.");
    }

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

    //find the party attribute
    var partyStatObjs = findObjs({
      _type: "attribute",
      name: statName
    });
    //are there no which attributes which match the name matches[2]?
    if(partyStatObjs.length <= 0){
      //no stat to work with. alert the gm and player
      whisper("There is nothing in the campaign with a(n) " + statName + " Attribute.",msg.playerid);
      //but don't alert the gm twice
      if(playerIsGM(msg.playerid) == false){
        whisper("There is nothing in the campaign with a(n) " + statName + " Attribute.");
      }
      return;
    //were there too many attributes that matched the name matches[2]?
    } else if(partyStatObjs.length >= 2){
      //warn the gm, but continue forward
      whisper("There were multiple " + statName + " attributes. Using the first one found. A log has been posted in the terminal.")
      log(statName+ " Attributes")
      log(partyStatObjs)
    }

    //record the stat
    stat = Number(partyStatObjs[0].get("current"));

    //default the stat to zero
    if(stat == undefined){
        stat = 0;
    }

    //only allow the gm to see the results of NPCs
    if(getObj("character",partyStatObjs[0].get("_characterid")).get("inplayerjournals") == ""){
        //output the roll
        whisper("&{template:default} {{name=<strong>" + statName +  "</strong>}} {{Successes=[[((" + stat.toString() + "+" + modifier.toString() + "-D100)/10)]]}} " + unnatural_bonus);
    } else {
        //check to see if Aging.js has been included
        //note that we are only adding in the aging penalty for player characters
        //if(Aging == undefined){}else{
          //add in the aging penalty
          //stat -= Aging.penalty(character.id);
        //}
        //output the stat roll (whisperGM determines if everyone can see it or if it was sent privately to the GM);
        sendChat("player|" + msg.playerid ,whisperGM + "&{template:default} {{name=<strong>" + statName +  "</strong>}} {{Successes=[[((" + stat.toString() + "+" + modifier.toString() + "-D100)/10)]]}}");
    }
}


//adds the commands after CentralInput has been initialized
on("ready", function() {
  //add the stat roller function to the Central Input list as a public command
  //inputs should appear like '!Fe+10' OR '!Ag ' OR '!gmS - 20  '
  CentralInput.addCMD(/^!\s*(gm)?\s*(WS|BS|S|T|Ag|It|Int|Wp|Pr|Per|Fe|Fel|Insanity|Corruption|Renown|Crew|Population|Moral)\s*(?:(\+|-)\s*(\d+)\s*)?$/i,function(matches,msg){
    //capitalize the stat name properly
    switch(matches[2].toLowerCase()){
      case "pr": case "pe":
        //replace pr with Per (due to conflicts with PsyRating(PR))
        matches[2] = "Per";
        break;
      case "ws": case "bs":
        //capitalize every letter
        matches[2] = matches[2].toUpperCase();
        break;
      case "int": case "in":
        matches[2] = "It";
      break;
      case "fel":
        matches[2] = "Fe";
      break;
      default:
        //most Attributes begin each word with a capital letter (also known as TitleCase)
        matches[2] = matches[2].toTitleCase();
        break;
    }
    statRoll(matches,msg);
  },true);

  //lets the user quickly view their stats with modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(WS|BS|S|T|Ag|In|It|Int|Wp|Pr|Pe|Per|Fe|Fel|Fate|Insanity|Corruption|Renown|Crew|Wounds|Fatigue|Population|Moral|Hull|Void Shields|Turret|Manoeuvrability|Detection|Armour(?:\s*|_)(?:H|RA|LA|B|RL|LR|F|S|R|P|A))\s*(\?\s*\+|\?\s*-|\?\s*\*|\?\s*\/|=|\+\s*=|-\s*=|\*\s*=|\/\s*=)\s*(|\+|-)\s*(\d*|max|current)\s*$/i,function(matches,msg){
    //capitalize the stat name properly
    switch(matches[2].toLowerCase()){
      case "pr": case "pe":
        //replace pr with Per (due to conflicts with PsyRating(PR))
        matches[2] = "Per";
        break;
      case "ws": case "bs":
        //capitalize every letter
        matches[2] = matches[2].toUpperCase();
        break;
      case "int": case "in":
        matches[2] = "It";
      break;
      case "fel":
        matches[2] = "Fe";
      break;
      default:
        //most Attributes begin each word with a capital letter (also known as TitleCase)
        matches[2] = matches[2].toTitleCase();
        break;
    }
    if(/^armour(\s*|_)\w\w?$/i.test(matches[2])){
        matches[2] = matches[2].replace(/^Armour\s*/,"Armour_");
        matches[2] = matches[2].replace(/_\w\w?$/, function(txt){return txt.toUpperCase();});
    }
    statHandler(matches,msg);
  },true);

  //similar to above, but shows the attribute without modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(WS|BS|S|T|Ag|It|In|Int|Wp|Pr|Pe|Per|Fe|Fel|Fate|Insanity|Corruption|Renown|Crew|Wounds|Fatigue|Population|Moral|Hull|Void Shields|Turret|Manoeuvrability|Detection|Armour(?:\s*|_)(?:H|RA|LA|B|RL|LR|F|S|R|P|A))\s*(\?)\s*$/i,function(matches,msg){
    //capitalize the stat name properly
    switch(matches[2].toLowerCase()){
      case "pr": case "pe":
        //replace pr with Per (due to conflicts with PsyRating(PR))
        matches[2] = "Per";
        break;
      case "ws": case "bs":
        //capitalize every letter
        matches[2] = matches[2].toUpperCase();
        break;
      case "int": case "in":
        matches[2] = "It";
      break;
      case "fel":
        matches[2] = "Fe";
      break;
      default:
        //most Attributes begin each word with a capital letter (also known as TitleCase)
        matches[2] = matches[2].toTitleCase();
        break;
    }
    if(/^armour(\s*|_)\w\w?$/i.test(matches[2])){
        matches[2] = matches[2].replace(/^Armour\s*/,"Armour_");
        matches[2] = matches[2].replace(/_\w\w?$/, function(txt){return txt.toUpperCase();});
    }
    statHandler(matches,msg);
  },true);

  //Lets players make a Profit Factor Test
  CentralInput.addCMD(/^!\s*(gm)?\s*(Profit\s*Factor|P\s*F)\s*(?:(\+|-)\s*(\d+)\s*)?$/i,function(matches,msg){
    matches[2] = "Profit Factor";
    partyStatRoll(matches,msg);
  },true);

  //Lets players freely view and edit cohesion with modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(Profit\s*Factor|P\s*F)\s*(\?\s*\+|\?\s*-|\?\s*\*|\?\s*\/|=|\+\s*=|-\s*=|\*\s*=|\/\s*=)\s*(|\+|-)\s*(\d+|current|max)\s*$/i, function(matches,msg){
    matches[2] = "Profit Factor";
    partyStatHandler(matches,msg);
  }, true);
  //Lets players view cohesion without modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(Profit\s*Factor|P\s*F)\s*(\?)()()\s*$/i, function(matches,msg){
    matches[2] = "Profit Factor";
    partyStatHandler(matches,msg);
  }, true);
});
