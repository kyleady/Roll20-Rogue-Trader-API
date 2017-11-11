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
  var toGM = matches[1] && matches[1].toLowerCase() == "gm"

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
    //then tell eachCharacter to not even look for a character
    msg.selected = [{_type: "unique"}];
  }

  //work through each selected character
  eachCharacter(msg, function(character, graphic){
    //by default assume each character is not an NPC
    var isNPC = false;
    //if working for a group stat, search for the stat anywhere in the campaign
    if(options["partyStat"]){
      //retrieve the value of the stat we are working with
      var stat = attributeValue(statName);
      //retrive the unnatural bonus to the stat we are working with
      //but don't worry if you can't find one
      var unnatural_stat = attributeValue("Unnatural " + statName,{alert: false});
      //ignore the name of the character that owns this stat
      var name = "";
    } else {
      //retrieve the value of the stat we are working with
      var stat = attributeValue(statName,{characterid: character.id, graphicid: graphic.id, bar: options["bar"]});
      //retrive the unnatural bonus to the stat we are working with
      //but don't worry if you can't find one
      var unnatural_stat = attributeValue("Unnatural " + statName,{characterid: character.id, graphicid: graphic.id, alert: false});
      //retrive the name of the character that owns the stat
      //and add a bit a formatting for later
      var name = ": " + character.get("name");
      //if the gm rolls for a character that isn't controlled by anyone, roll it
      //privately
      isNPC = character.get("controlledby") == "";
    }

    //be sure the stat exists
    //attrValue should warn if something went wrong
    if(stat == undefined){return;}

    //by default, don't include the unnatural bonus
    var unnatural_bonus = "";
    if(unnatural_stat != undefined){
      unnatural_bonus = "{{Unnatural= [[ceil((" + unnatural_stat + ")/2)]]}}";
    }

    //if this is sent to the gm or if the gm is rolling for an NPC, whisper it
    if(toGM || (isNPC && playerIsGM(msg.playerid))){
      var whisperGM = "/w gm ";
      if(!playerIsGM(msg.playerid)){
        whisper("Rolling " + statName + " for GM.", {speakingTo: msg.playerid});
      }
    } else {
      var whisperGM = "";
    }
    //output the stat roll (whisperGM determines if everyone can see it or if it was sent privately to the GM);
    var output = "&{template:default} ";
    output += "{{name=<strong>" + statName +  "</strong>" + name + "}} ";
    if(options["display"]){
      _.each(options["display"], function(line){
        output += "{{" + line.Title  + "=" + line.Content + "}}";
      });
    }
    output += "{{Successes=[[((" + stat.toString() + "+" + modifier.toString() + "-D100)/10)]]}} ";
    output += unnatural_bonus;
    announce(whisperGM + output);
  });
}

//trims down and properly capitalizes any alternate stat names that the user
//enters
function getProperStatName(statName){
  var isUnnatural = /^unnatural /i.test(statName);
  if(isUnnatural){
    statName = statName.replace(/^unnatural /i,"");
  }
  switch(statName.toLowerCase()){
    case "pr": case "pe":
      //replace pr with Per (due to conflicts with PsyRating(PR))
      statName = "Per";
      break;
    case "psy rating":
      statName = "PR";
      break;
    case "ws": case "bs":
      //capitalize every letter
      statName = statName.toUpperCase();
      break;
    case "int": case "in":
      statName = "It";
      break;
    case "fel":
      statName = "Fe";
      break;
    case "cor":
      statName = "Corruption";
      break;
    case "dam":
      statName = "Damage";
      break;
    case "pen":
      statName = "Penetration";
      break;
    case "prim":
      statName = "Primitive";
      break;
    case "fell":
      statName = "Felling";
      break;
    case "damtype":
      statName = 'DamageType';
      break;
    default:
      //most Attributes begin each word with a capital letter (also known as TitleCase)
      statName = statName.toTitleCase();
  }
  statName = statName.replace(/^armour(?:_|\s*)(\w\w?)$/i, function(match, p1){
    return "Armour_" + p1.toUpperCase();
  });
  if(isUnnatural){
    statName = "Unnatural " + statName;
  }
  return statName;
}

//returns barX, if the given stat is represented by barX on a token
//if it isn't represented by any bar, it returns undefined
function defaultToTokenBars(name){
  switch(name.toTitleCase()){
    case "Fatigue":
    case "Population":
    case "Tactical Speed":
      return "bar1";
    case "Fate":
    case "Morale":
    case "Aerial Speed":
      return "bar2";
    case "Wounds":
    case "Structural Integrity":
    case "Hull":
      return "bar3";
  }
  return undefined;
}

//adds the commands after CentralInput has been initialized
on("ready", function() {
  //add the stat roller function to the Central Input list as a public command
  //inputs should appear like '!Fe+10' OR '!Ag ' OR '!gmS - 20  '
  CentralInput.addCMD(/^!\s*(gm)?\s*(WS|BS|S|T|Ag|It|Int|Wp|Pr|Per|Fe|Fel|Insanity|Corruption|Renown|Crew|Population|Morale)\s*(?:(\+|-)\s*(\d+)\s*)?$/i,function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    var tokenBar = defaultToTokenBars(matches[2]);
    statRoll(matches,msg,{bar: tokenBar});
  },true);

  //lets the user quickly view their stats with modifiers
  var inqStats = ["WS", "BS", "S", "T", "Ag", "I(?:n|t|nt)", "Wp", "P(?:r|e|er)", "Fel?", "Cor", "Corruption", "Wounds", "Structural Integrity"];
  var inqLocations = ["H", "RA", "LA", "B", "RL", "LR", "F", "S", "R", "P", "A"];
  var inqAttributes = ["Psy Rating", "Fate", "Insanity", "Renown", "Crew", "Fatigue", "Population", "Morale", "Hull", "Void Shields", "Turret", "Manoeuvrability", "Detection", "Tactical Speed", "Aerial Speed"];
  var inqUnnatural = "Unnatural (?:";
  for(var inqStat of inqStats){
    inqAttributes.push(inqStat);
    inqUnnatural += inqStat + "|";
  }
  inqUnnatural = inqUnnatural.replace(/|$/,"");
  inqUnnatural += ")";
  inqAttributes.push(inqUnnatural);
  var inqArmour = "Armour_(?:";
  for(var inqLocation of inqLocations){
    inqArmour += inqLocation + "|";
  }
  inqArmour = inqArmour.replace(/|$/,"");
  inqArmour += ")";
  inqAttributes.push(inqArmour);
  var re = makeAttributeHandlerRegex(inqAttributes);
  CentralInput.addCMD(re, function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    var tokenBar = defaultToTokenBars(matches[2]);
    attributeHandler(matches,msg,{bar: tokenBar});
  },true);

  //Lets players make a Profit Factor Test
  CentralInput.addCMD(/^!\s*(gm)?\s*(Profit Factor)\s*(?:(\+|-)\s*(\d+)\s*)?$/i,function(matches,msg){
    matches[2] = "Profit Factor";
    statRoll(matches,msg,{partyStat: true});
  },true);
  var profitFactorRe = makeAttributeHandlerRegex("Profit Factor");
  //Lets players freely view and edit profit factor with modifiers
  CentralInput.addCMD(profitFactorRe, function(matches,msg){
    matches[2] = "Profit Factor";
    attributeHandler(matches,msg,{partyStat: true});
  }, true);
});
