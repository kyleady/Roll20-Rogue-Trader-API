function attrTable(name, current, max, options){
  options = options || {};
  if(options["color"] == undefined){
    options["color"] = "00E518";
  }
  var attrTable = "<table border = \"2\" width = \"100%\">";
  //title
  attrTable += "<caption>" + name + "</caption>";
  //label row - Current, Max
  attrTable += "<tr bgcolor = \"" + options["color"] + "\"><th>Current</th><th>Max</th></tr>";
  //temporary attribute row (current, max)
  attrTable += "<tr bgcolor = \"White\"><td>" + current + "</td><td>" + max + "</td></tr>";
  //end table
  attrTable += "</table>";

  return attrTable;
}

//general use stat modifier/reporter
//matches[0] is the same as msg.context
//matches[1] is whether or not the user is editting the max attribute (if == "max")
//matches[2] is the name of the Attribute
//matches[3] is the text operator "=", "?+", "*=", etc
//matches[4] is the sign of the modifier
//matches[5] is the modifier (numerical, current, max, or an inline roll)
function statHandler(matches,msg,options){
  //default to no options
  options = options || {};
  //by default, show the results of the handler
  if(options["show"] == undefined){
    options["show"] = true;
  }

  var isMax = matches[1].toLowerCase() == "max";
  var statName = matches[2];
  var operator = matches[3].replace("/\s/g","");
  var sign = matches[4] || "";
  //check if the modifier was randomly rolled
  if(matches[5] == "$[[0]]"){
    var modifier = msg.inlinerolls[0].results.total.toString();
  } else {
    //otherwise save the modifier without transforming it into a number yet
    var modifier = matches[5] || "";
  }

  //is the stat a public stat, shared by the entire party?
  if(options["partyStat"]){
    //overwrite msg.selected. Whatever was selected does not matter
    //we need one item in msg.selected to iterate over
    msg.selected = [{_type: "unique"}];
  }

  //work through each selected character
  eachCharacter(msg, function(character, graphic){
    //first check if the selected characters are being overwritten with the party stat
    if(options["partyStat"]){
      var currentAttr = attrValue(statName,{max: false});
      var maxAttr     = attrValue(statName,{max: true, alert: false});
      var name = "";
    } else {
      var currentAttr = attrValue(statName,{characterid: character.id, graphicid: graphic.id, max: false});
      var maxAttr     = attrValue(statName,{characterid: character.id, graphicid: graphic.id, max: true, alert: false});
      var name = character.get("name");
    }

    //be sure the attribute we are seeking exists
    if(currentAttr == undefined){
      //attrValue should warn if something went wrong
      return;
    }

    //if the currentAttr exists but the maxAttr does not then we are likely
    //dealing with a temporary attribute that does not exist on the represented
    //character sheet.
    if(maxAttr == undefined){
      //if the user is trying to edit the maximum stat, inform them that this is
      //impossible and quit
      if(modifier == "max" && operator == "="){
        attrValue(statName,{characterid: character.id, graphicid: graphic.id, delete: true, alert: false});
        whisper(statName + " has been reset.", msg.playerid);
        if(!playerIsGM(msg.playerid)){whisper(statName + " has been reset.");}
        return;
      } else if(isMax || modifier == "max"){
        whisper("Temporary attributes do not have maximums to work with.");
        return;
      } else {
        maxAttr = "-";
      }
    }

    //which stat are we editing?
    if(isMax){
      var stat = maxAttr;
    } else {
      var stat = currentAttr;
    }

    //is the modifier the max or current attribute?
    if(modifier.toLowerCase() == "max"){
      var tempModifier = maxAttr;
    } else if(modifier.toLowerCase == "current"){
      var tempModifier = currentAttr;
    } else {
      var tempModifier = modifier;
    }

    //modify the stat number with the operator
    stat = numModifier.calc(stat, operator, sign+tempModifier);

    //is the user making a querry?
    if(operator.indexOf("?") != -1) {
      //are we showing the result?
      if(options["show"] == false){
        //end here before showing any results
        return;
      }
      //show the change
      if(isMax){
        maxAttr = stat;
      } else {
        currentAttr = stat;
      }
      //whisper the result of the querry to just the user
      whisper(name + attrTable(statName, currentAttr, maxAttr), msg.playerid);
    //otherwise the user is editing the attribute
    } else if(operator.indexOf("=") != -1){
      //save the result
      if(options["partyStat"]){
        attrValue(statName,{setTo: stat, max: isMax});
      //normally msg.selected is just a list of object ids and types of the
      //objects you have selected. If this is the case, find the corresponding
      //character objects.
      } else {
        attrValue(statName,{setTo: stat, characterid: character.id, graphicid: graphic.id, max: isMax});
      }

      //are we showing the result?
      if(options["show"] == false){
        //end here before showing any results
        return;
      }

      var output = attrTable(statName, currentAttr, maxAttr);

      //show the change
      if(isMax){
        maxAttr = stat;
      } else {
        currentAttr = stat;
      }

      output += attrTable("|</caption><caption>V", currentAttr, maxAttr, "Yellow");

      if(options["partyStat"]){
        //get the list of people who can view the host character sheet
        var viewers = canViewAttr(statName,{alert: false});
        //can everyone see the sheet?
        if(viewers.indexOf("all") != -1){
          //publicly announce the change to everyone
          announce(name + output);
        } else {
          if(viewers[0] != ""){
            //inform each player that can view the attribute of the change
            _.each(viewers, function(viewer){
              whisper(name + output,viewer);
            });
          }
          //also inform the gm
          whisper(name + output);
        }
      } else {
        //whisper the stat change to the user and gm (but do not whisper it to the gm twice)
        whisper(name + output, msg.playerid);
        if(playerIsGM(msg.playerid) == false){
          whisper(name + output);
        }
      }
    }
  });
}

//enforce the correct spelling, capitalization, and spelling for your attributes
function correctAttributeName(name){
  return name.trim();
}

on("ready", function(){
  var yourAttributes = [
    //list any attributes you want to restrict your access to here
  ];
  var regex = "!\\s*";
  regex += "(|max)\\s*";
  regex += "attr\\s+";
  if(yourAttributes.length <= 0){
    regex += "(\\S[^-\\+=/\\?\\*]*)\\s*";
  } else {
    regex += "("
    _.each(yourAttributes, function(yourAttribute){
      regex += yourAttribute + "|";
    });
    regex = regex.replace(/\|$/, "");
    regex += ")";
  }
  regex += "\\s*" + numModifier.regexStr();
  regex += "\\s*(\d*|max|current)";
  regex += "\\s*$";

  var re = RegExp(regex, "i");
  CentralInput.addCMD(re, function(matches, msg){
    matches[2] = correctAttributeName(matches[2]);
    statHandler(matches, msg);
  }, true);
});
