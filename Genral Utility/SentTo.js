//general use function that attempts to set the current player page
//it can also be used to set the current page for specific players
//matches[1] is a list of key words to determine which map to send the players to
//matches[2] is a numerical modifier to specify which map to send the players to
            //if there are multiple maps with identical names
//matches[3] is a list of key words to determine which players to send
function sendToPage(matches,msg){
  //be sure the matches exist
  matches[1] = matches[1] || "";
  matches[2] = matches[2] || "";
  matches[3] = matches[3] || "";

  //turn the user input into data
  var mapKeywords    = matches[1].toLowerCase().split(" ");
  var whichMap       = Number(matches[2]) || 1;
  var playerKeywords = matches[3].toLowerCase().split(" ");

  //be sure there are no empty keywords
  if(mapKeywords[0] == ""){mapKeywords = [];}
  if(playerKeywords[0] == ""){playerKeywords = [];}

  //get arrays of matching maps, players, and default characters
  var mapResults    = matchingObjs(["page"], mapKeywords);
  var playerResults = matchingObjs(["player"], playerKeywords);
  var characterResults = matchingObjs(["character"], playerKeywords, function(obj){
    //check if this character is controlled by just one non-gm player
    var owners = obj.get("controlledby").split(",")
    return !(owners.length != 1 || owners[0] == "all" || playerIsGM(owners[0]))
  });

  //get the owning players from the default characters and add any unique ones
  //to the list of players
  _.each(characterResults, function(character){
    var newPlayerID = true;
    var playerID = character.get("controlledby");
    for(var i = 0; i < playerResults.length; i++){
      if(playerResults[i].id == playerID){
        newPlayerID = false;
        break;
      }
    }
    if(newPlayerID){
      playerResults.push(getObj("player", playerID));
    }
  });

  //rage quit if no maps were found
  if(mapResults.length <= 0){
    return whisper("No matching maps were found.");
  }
  //rage quit if no players were found WHEN attempting to find a specific player
  if(playerResults.length <= 0 && playerKeywords.length >= 1){
    return whisper("No matching players were found.")
  }

  //first, resolve any disambiguation between maps
  if(mapResults.length >= 2){
    whisper("Multiple maps found.");

    return;
  }
  //second, resolve any disambiguation between players
  if(playerResults.length >= 2){
    whisper("Multiple players found.")

    return;
  }

  //if there is no disambiguation to be done, proceed

  //if no player was specified, move the entire party
  if(playerResults.length <= 0){
    //move the party
    Campaign().set("playerpageid", mapResults[0].id);
    //tell the gm what happened
    whisper("The party has been moved to " + mapResults[0].get("name"));
  //otherwise set the page for the specific player
  } else {
    //get the list of specific pages
    var playerPages = Campaign().get("playerspecificpages");
    //be sure the player specific pages object exists
    playerPages = playerPages || {};
    //specify the page for the player
    playerPages[playerResults[0].id] = mapResults[0].id;
    //record the result
    Campaign().set("playerspecificpages", playerPages);
    //tell the gm what happened
    whisper("*" + playerResults[0].get("_displayname") + "* was moved to *" + mapResults[0].get("name") + "*");
  }
}

//returns players from their player specific pages
  //matches[1] the name of the player to return
function returnPlayers(matches, msg){
  //get the list of player specific pages
  var playerPages = Campaign().get("playerspecificpages");
  //warn the gm if there is no one to return
  if(!playerPages){
    return whisper("There are no players to return from their player specific pages.")
  }
  //begin by creating a list of players that can be returned
  var playersToReturn = [];
  for(var player in playerPages){
    playersToReturn.push(player);
  }

  //create a list of keywords from the user input
  var playerKeywords = matches[1].toLowerCase().split(" ");

  //do not accept an empty string as a keyword
  if(playerKeywords[0] == ""){playerKeywords = [];}

  //get arrays of matching players and characters
  var playerResults = matchingObjs(["player"], playerKeywords);
  var characterResults = matchingObjs(["character"], playerKeywords, function(obj){
    //check if this character is controlled by just one non-gm player
    var owners = obj.get("controlledby").split(",")
    return !(owners.length != 1 || owners[0] == "all" || playerIsGM(owners[0]))
  });

  //get the owning players from the default characters and add any unique ones
  //to the list of players
  _.each(characterResults, function(character){
    var newPlayerID = true;
    var playerID = character.get("controlledby");
    for(var i = 0; i < playerResults.length; i++){
      if(playerResults[i].id == playerID){
        newPlayerID = false;
        break;
      }
    }
    if(newPlayerID){
      playerResults.push(getObj("player", playerID));
    }
  });

  //rage quit if no players were found WHEN attempting to find a specific player
  if(playerResults.length <= 0 && playerKeywords.length >= 1){
    return whisper("No matching players were found.")
  }

  //trim down the results based on who there is to return
  var returningPlayers = [];
  _.each(playerResults, function(player){
    if(playersToReturn.indexOf(player.id) != -1){
      returningPlayers.push(player);
    } else {
      whisper("*" + player.get("_displayname") + "* is not on a player specific page.");
    }
  });

  //if no keywords were given, just return everyone
  if(playerKeywords.length <= 0){
    _.each(playersToReturn, function(playerid){
      returningPlayers.push(getObj("player", playerid));
    });
  }

  //return each of the players to the party
  _.each(returningPlayers, function(player){
    delete playerPages[player.id];
    whisper("*" + player.get("_displayname") + "* has returned to the main party.");
  });

  //save the result
  Campaign().set("playerspecificpages", playerPages);
}

on("ready",function(){
  //matches[0] is the same as msg.content
  //matches[1] is the map search criteria
  //matches[2] is the number map (when maps have the exact same name)
  //matches[3] is the player search criteria
  CentralInput.addCMD(/^!\s*send\s*to\s+([^\|\[\]]+)\s*(?:\[(\d+)\])?\s*(?:\|\s*([^\|\[\]]+)\s*)?$/i,sendToPage);

  //matches[0] is the same as msg.content
  //matches[1] is the player search criteria
  CentralInput.addCMD(/^!\s*return\s*([^\|\[\]]*)\s*$/i,returnPlayers);
});
