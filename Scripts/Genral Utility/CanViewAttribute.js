//returns an array of player ids that can view the character sheet hosting the attribute
function canViewAttr(name,options){
  //default to no options
  options = options || [];

  //default to alerting the gm
  if(options["alert"] == undefined){
    options["alert"] = true;
  }

  //was a graphic id supplied?
  if(options["graphicid"]){
    //get the graphic
    var graphic = getObj("graphic",options["graphicid"]);
    //be sure the graphic was found
    if(graphic == undefined){
      if(options["alert"]){whisper("Graphic " + options["graphicid"] + " does not exist.");}
      return undefined;
    }

    //otherwise, just save the linked charater id and continue
    options["characterid"] = graphic.get("represents");
  }

  //do we have a specific character id at this point?
  if(options["characterid"]){
    //be sure the character exists
    var character = getObj("character",options["characterid"]);
    if(character == undefined){
      if(options["alert"]){whisper("Character " + options["characterid"] + " does not exist.");}
      return undefined;
    }

  //otherwise, assume that the user was searching for a unique attribute
  } else {
    //these unique attributes are often single attributes shared by the entire party
    var statObjs = findObjs({
      _type: "attribute",
      name: name
    });
    //were there no attributes with that name anywhere?
    if(statObjs.length <= 0){
      //no stat to work with. report the error and exit.
      if(options["alert"]){whisper("There is nothing in the campaign with a(n) " + name + " Attribute.");}
      return undefined;
    //were there too many attributes that matched the name?
    } else if(statObjs.length >= 2){
      //warn the gm, but continue forward
      if(options["alert"]){whisper("There were multiple " + name + " attributes. Using the first one found. A log has been posted in the terminal.");}
      log(name + " Attributes")
      log(statObjs)
    }

    //get the character object hosting the attribute
    var character = getObj("character",statObjs[0].get("_characterid"));
  }
  //make an array out of the list of players that can view this character sheet
  return viewerList = character.get("inplayerjournals").split(",");
}
