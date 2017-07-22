//general use function that attempts to set the current player page
//it can also be used to set the current page for specific players
//matches[1] is a list of key words to determine which map to send the players to
//matches[2] is a list of key words to determine which players to send
function sendToPage(matches,msg){
  //be sure the optional match exist
  var mapPhrase    = matches[1] || "";
  var playerPhrase = matches[2] || "";

  var mapKeywords    = mapPhrase.split(" ");
  var playerKeywords = playerPhrase.split(" ");

  //get arrays of matching maps, players, and default characters
  var mapResults    = matchingObjs("page", mapKeywords);
  var playerResults = matchingObjs("player", playerKeywords);
  var characterResults = matchingObjs("character", playerKeywords, function(obj){
    //check if this character is controlled by just one non-gm player
    var owners = obj.get("controlledby").split(",")
    return !(owners.length != 1 || owners[0] == "" || owners[0] == "all" || playerIsGM(owners[0]))
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
  if(playerResults.length <= 0 && playerPhrase != ""){
    return whisper("No matching players were found.")
  }

  //see if we can trim down the results to just exact matches
  mapResults = trimToPerfectMatches(mapResults, playerPhrase);

  //see if we can trim down the results to just exact matches
  playerResults = trimToPerfectMatches(playerResults, playerPhrase);

  //if there are still too many map results, make the user specify
  if(mapResults.length >= 2){
    //let the gm know that multiple maps were found
    whisper("Which map did you mean?");
    //determine the player keywords
    var playerSearch = "";
    if(playerResults.length == 1){
      playerSearch = "|" + playerResults[0].get("_displayname");
    } else if(playerResults.length > 1){
      playerSearch = "|" + playerPhrase;
    }
    //give a suggestion for each possible map match
    _.each(mapResults, function(map){
      var suggestion = map.get("name") + playerSearch;
      whisper("[" + suggestion + "](!sendTo " + suggestion + ")");
    });
    //stop here, we have done all we can for now
    return;
  }

  //if there are still too many player results, make the user specify
  if(playerResults.length >= 2){
    //let the gm know that multiple maps were found
    whisper("Which player did you mean?");
    //note the map search
    var mapSearch = mapResults[0].get("name");
    //give a suggestion for each possible player match
    _.each(playerResults, function(player){
      var suggestion = mapSearch + "|" + player.get("_displayname");
      whisper("[" + suggestion + "](!sendTo " + suggestion + ")");
    });
    //stop here, we have done all we can for now
    return;
  }

  //if there is no disambiguation to be done, proceed

  //if no player was specified, move the entire party
  if(playerResults.length <= 0){
    //move the party
    Campaign().set("playerpageid", mapResults[0].id);
    //tell the gm what happened
    whisper("The party has been moved to *" + mapResults[0].get("name") + "*");
  //otherwise set the page for the specific player
  } else {
    //get the list of specific pages
    var playerPages = Campaign().get("playerspecificpages");
    //be sure the player specific pages object exists
    playerPages = playerPages || {};
    //send each named player to the specified map
    _.each(playerResults, function(player){
      //specify the page for the player
      playerPages[player.id] = mapResults[0].id;
      //tell the gm what happened
      whisper("*" + player.get("_displayname") + "* was moved to *" + mapResults[0].get("name") + "*");
    });
    //record the result
    Campaign().set("playerspecificpages", playerPages);
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

  //make the player phrase
  var playerPhrase = matches[1] || "";
  //create a list of keywords from the user input
  var playerKeywords = playerPhrase.split(" ");

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
  if(playerResults.length <= 0 && playerPhrase != ""){
    return whisper("No matching players were found.")
  }

  //trim down the results to exact matches if exact matches are found
  playerResults = trimToPerfectMatches(playerResults, playerPhrase);

  //trim down the results based on who there is to return
  var returningPlayers = [];
  _.each(playerResults, function(player){
    if(playersToReturn.indexOf(player.id) != -1){
      returningPlayers.push(player);
    } else {
      whisper("*" + player.get("_displayname") + "* is not on a player specific page.");
    }
  });

  //if there are still too many player results, make the user specify
  if(playerResults.length >= 2){
    //let the gm know that multiple maps were found
    whisper("Which player did you mean?");
    //give a suggestion for each possible player match
    _.each(playerResults, function(player){
      var suggestion = player.get("_displayname");
      whisper("[" + suggestion + "](!return " + suggestion + ")");
    });
    //stop here, we have done all we can for now
    return;
  }

  //if no keywords were given, just return everyone
  playerPhrase.trim();
  if(playerPhrase == ""){
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
  if(_.isEmpty(playerPages)){
    //if there are no player specific pages, set the whole thing to false
    Campaign().set("playerspecificpages", false);
  } else {
    Campaign().set("playerspecificpages", playerPages);
  }
}

on("ready",function(){
  //matches[0] is the same as msg.content
  //matches[1] is the map search criteria
  //matches[2] is the player search criteria
  CentralInput.addCMD(/^!\s*send\s*to\s([^\|\[\]]+)\s*(?:\|\s*([^\|\[\]]+)\s*)?$/i,sendToPage);

  //matches[0] is the same as msg.content
  //matches[1] is the player search criteria
  CentralInput.addCMD(/^!\s*return(?:\s([^\|\[\]]+))?$/i,returnPlayers);
});
