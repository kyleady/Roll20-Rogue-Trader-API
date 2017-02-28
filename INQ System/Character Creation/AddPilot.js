//allows the GM to add the details and attributes of a character to a vehicle,
//to function as the default pilot
//matches[1] - used to find the pilot to add
function addPilot(matches, msg){
  var pilotPhrase = matches[1];
  var pilotKeywords = pilotPhrase.split(" ");

  //if nothing was selected, ask the GM to select someone
  if(msg.selected == undefined || msg.selected.length <= 0){
    return whisper("Please select a vehicle to take the pilot.");
  }

  //find the pilot specified
  var pilotResults = matchingObjs("character", pilotKeywords);

  //rage quit if no maps were found
  if(pilotResults.length <= 0){
    return whisper("No matching pilots were found.");
  }

  //see if we can trim down the results to just exact matches
  pilotResults = trimToPerfectMatches(pilotResults, pilotPhrase);

  //if there are still too many pilot results, make the user specify
  if(pilotResults.length >= 2){
    //let the gm know that multiple maps were found
    whisper("Which pilot did you mean?");
    //give a suggestion for each possible pilot match
    _.each(pilotResults, function(pilot){
      var suggestion = "addPilot " + pilot.get("name");
      suggestion = "!{URIFixed}" + encodeURIFixed(suggestion);
      whisper("[" + pilot.get("name") + "](" + suggestion  + ")");
    });
    //stop here, we must wait for the user to specify
    return;
  }

  //get the pilot's bio
  var pilotBio = "";
  pilotResults[0].get("bio", function(bio){
    if(bio != "null"){
      pilotBio += bio;
    }
  });
  pilotResults[0].get("gmnotes", function(gmnotes){
    if(gmnotes != "null"){
      if(pilotBio != ""){
        pilotBio += "<br>";
      }
      pilotBio += gmnotes;
    }
  });

  //copy the pilot's Attributes
  var pilotAttributes = [];
  var attributes = findObjs({
    _type: "attribute",
    _characterid: pilotResults[0].id
  });
  _.each(attributes, function(attribute){
    var attributeCopy = {
      name: attribute.get("name"),
      value: attribute.get("max")
    };
    pilotAttributes.push(attributeCopy);
  });



  //add the single pilot to each selected roll20 character(vehicle)
  eachCharacter(msg, function(vehicle, graphic){

    //get the vehicle gmnotes
    var notes = "";
    vehicle.get("gmnotes", function(gmnotes){
      if(gmnotes != "null"){
        notes = gmnotes;
      }
    });

    //add the pilot to the vehicle notes
    notes += "<hr><div style=\"text-align: center\"><strong>Pilot</strong></div><br><br>";
    notes += pilotBio;

    //save the addition
    vehicle.set("gmnotes", notes);

    //add each of the pilot attributes
    _.each(pilotAttributes, function(attribute){
      createObj("attribute", {
        name: attribute.name,
        current: attribute.value,
        max: attribute.value,
        _characterid: vehicle.id
      });
    });

    //alert the gm of the success
    whisper("The pilot, " + pilotResults[0].get("name") + ", was added to " + vehicle.get("name") + ".");
  });
}

//waits until CentralInput has been initialized
on("ready", function(){
  CentralInput.addCMD(/^!\s*add\s*pilot\s+(.+)$/, addPilot);
});
