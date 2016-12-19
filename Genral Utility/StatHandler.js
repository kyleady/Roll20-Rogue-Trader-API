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
    //normally msg.selected is just a list of object ids and types of the
    //objects you have selected. If this is the case, find the corresponding
    //character objects.
    } else {
      var currentAttr = attrValue(statName,{characterid: character.id, max: false});
      var maxAttr     = attrValue(statName,{characterid: character.id, max: true, alert: false});
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
      if(isMax || modifier == "max"){
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
      //add some formating to name if it isn't empty
      if(name != ""){
        name = name + "'s ";
      }
      //whisper the result of the querry to just the user
      whisper(name + "<strong>" + statName + "</strong> " + operator + " " + sign + modifier + ": [[" + stat.toString() + "]]", msg.playerid);
    //otherwise the user is editing the attribute
    } else if(operator.indexOf("=") != -1){
      //save the result
      if(options["partyStat"]){
        attrValue(statName,{setTo: stat, max: isMax});
      //normally msg.selected is just a list of object ids and types of the
      //objects you have selected. If this is the case, find the corresponding
      //character objects.
      } else {
        attrValue(statName,{setTo: stat, characterid: character.id, max: isMax});
      }

      //are we showing the result?
      if(options["show"] == false){
        //end here before showing any results
        return;
      }

      var attrTable = "<table border = \"2\" width = \"100%\">";
      //title
      attrTable += "<caption>" + statName + "</caption>";
      //label row - Current, Max
      attrTable += "<tr bgcolor = \"00E518\"><th>Current</th><th>Max</th></tr>";
      //temporary attribute row (current, max)
      attrTable += "<tr bgcolor = \"White\"><td>" + currentAttr + "</td><td>" + maxAttr + "</td></tr>";
      //end table
      attrTable += "</table>";

      //show the change
      if(isMax){
        maxAttr = stat;
      } else {
        currentAttr = stat;
      }

      attrTable += "<table border = \"2\" width = \"100%\">";
      //title (an arrow pointing to the result)
      attrTable += "<caption>|</caption>";
      attrTable += "<caption>V</caption>";
      //label row - Current, Max
      attrTable += "<tr bgcolor = \"Yellow\"><th>Current</th><th>Max</th></tr>";
      //modified attribute row (current, max)
      attrTable += "<tr bgcolor = \"White\"><td>" + currentAttr + "</td><td>" + maxAttr  + "</td></tr>";
      //end table
      attrTable += "</table>";


      if(options["partyStat"]){
        //get the list of people who can view the host character sheet
        var viewers = canViewAttr(statName,{alert: false});
        //can everyone see the sheet?
        if(viewers.indexOf("all") != -1){
          //publicly announce the change to everyone
          sendChat("player|" + msg.playerid, name + attrTable);
        } else {
          if(viewers[0] != ""){
            //inform each player that can view the attribute of the change
            _.each(viewers, function(viewer){
              whisper(name + attrTable,viewer);
            });
          }
          //also inform the gm
          whisper(name + attrTable);
        }
      } else {
        //whisper the stat change to the user and gm (but do not whisper it to the gm twice)
        whisper(name + attrTable,msg.playerid);
        if(playerIsGM(msg.playerid) == false){
          whisper(name + attrTable);
        }
      }
    }
  });
}
