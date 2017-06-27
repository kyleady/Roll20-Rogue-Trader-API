//sets the selected token as the default token for the named character after
//detailing the token
//  matches[1] - the name of the character sheet
function setDefaultToken(matches, msg){
  //get the selected token
  if(msg.selected && msg.selected.length == 1){
    var graphic = getObj("graphic", msg.selected[0]._id);
    //be sure the graphic exists
    if(graphic == undefined) {
      return whisper("graphic undefined");
    }
  } else {
    return whisper("Please select exactly one token.");
  }
  //try to find the specified character
  var characters = matchingObjs("character", matches[1].split(' '));
  //rage quit if no characters were found
  if(characters.length <= 0){
    return whisper("No matching characters were found.");
  }
  //see if we can trim down the results to just exact matches
  characters = trimToPerfectMatches(characters, matches[1]);
  //if there are still too many pilot results, make the user specify
  if(characters.length >= 2){
    //let the gm know that multiple characters were found
    whisper("Which character did you mean?");
    //give a suggestion for each possible character match
    _.each(characters, function(character){
      var suggestion = "Give Token To " + character.get("name");
      suggestion = "!{URIFixed}" + encodeURIFixed(suggestion);
      whisper("[" + character.get("name") + "](" + suggestion  + ")");
    });
    //stop here, we must wait for the user to specify
    return;
  }

  var character = characters[0];

  //get the Fate, Fatigue, and Wounds of the character
  var Fate = getAttrByName(character.id, "Fate", "max");
  var Fatigue = getAttrByName(character.id, "Fate", "max");
  var Wounds = getAttrByName(character.id, "Wounds", "max");

  //detail the graphic
  graphic.set("bar1_link", "");
  graphic.set("bar2_link", "");
  graphic.set("bar3_link", "");

  graphic.set("represents", character.id);
  graphic.set("name", character.get("name"));

  graphic.set("bar1_value", Fatigue);
  graphic.set("bar2_value", Fate);
  graphic.set("bar3_value", Wounds);

  graphic.set("bar1_max", Fatigue);
  graphic.set("bar2_max", Fate);
  graphic.set("bar3_max", Wounds);

  graphic.set("showname", true);
  graphic.set("showplayers_name", true);
  graphic.set("showplayers_bar1", true);
  graphic.set("showplayers_bar2", true);
  graphic.set("showplayers_bar3", true);
  graphic.set("showplayers_aura1", true);
  graphic.set("showplayers_aura2", true);

  setDefaultTokenForCharacter(character, graphic);

  whisper("Default Token set for *" + GetLink(character.get("name")) + "*.");
}

on("ready", function(){
  CentralInput.addCMD(/^!\s*give\s*token\s*to\s+(.+)$/, setDefaultToken);
});
