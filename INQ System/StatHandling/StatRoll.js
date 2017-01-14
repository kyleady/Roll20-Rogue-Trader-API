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
      var stat = attrValue(statName);
      //retrive the unnatural bonus to the stat we are working with
      //but don't worry if you can't find one
      var unnatural_stat = attrValue("Unnatural " + statName,{alert: false});
      //ignore the name of the character that owns this stat
      var name = "";
    } else {
      //retrieve the value of the stat we are working with
      var stat = attrValue(statName,{characterid: character.id, graphicid: graphic.id});
      //retrive the unnatural bonus to the stat we are working with
      //but don't worry if you can't find one
      var unnatural_stat = attrValue("Unnatural " + statName,{characterid: character.id, graphicid: graphic.id, alert: false});
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
        whisper("Rolling " + statName + " for GM.", msg.playerid);
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
    sendChat("player|" + msg.playerid , whisperGM + output);
  });
}

//trims down and properly capitalizes any alternate stat names that the user
//enters
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

  //Lets players freely view and edit profit factor with modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(Profit\s*Factor|P\s*F)\s*(\?\s*\+|\?\s*-|\?\s*\*|\?\s*\/|=|\+\s*=|-\s*=|\*\s*=|\/\s*=)\s*(|\+|-)\s*(\d+|current|max)\s*$/i, function(matches,msg){
    matches[2] = "Profit Factor";
    statHandler(matches,msg,{partyStat: true});
  }, true);
  //Lets players view profit factor without modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(Profit\s*Factor|P\s*F)\s*(\?)()()\s*$/i, function(matches,msg){
    matches[2] = "Profit Factor";
    statHandler(matches,msg,{partyStat: true});
  }, true);
});
