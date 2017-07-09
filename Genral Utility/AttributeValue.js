//allows for quick manipulation of character attributes, defaulting to current
//values.

//If the max value is edited, the current value will be set to the max value.

//If a token that doesn't have any linked attributes is editted, it will make
//the assumption that the token does not represent a individual character but
//a generic goon. It will thus not modify the character sheet it is connected to
//and instead write down the modifications in the gmnotes of the token.
//StatHandler.js will be able to read and make use of these notes.

//recognized options are
  //alert = true - should the gm be alerted to attribute changes
  //max = false - are we editting the max value? otherwise edit the current
                    //value
  //graphicid = undefined - what is the id of the token that represents the
                            //character which holds this attribute?
  //characterid = undefined - what is the id of the character which holds this
                              //attribute?
  //setTo = undefined - what value are we setting the attribute to?

function attrValue(name, options){
  //default to no options
  options = options || [];

  //default to alerting the gm
  if(options["alert"] == undefined){
    options["alert"] = true;
  }

  //are we working with the current or max attribute?
  if(options["max"]){
    var workingWith = "max";
  } else {
    var workingWith = "current";
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

    //if this attribute is represented by a bar, work with the bar instead
    if(options["bar"]){
      if(workingWith == "current"){
        workingWith = "value";
      }
      if(options["setTo"] != undefined){
        graphic.set(options["bar"] + "_" + workingWith, options["setTo"]);
      }
      var barValue = graphic.get(options["bar"] + "_" + workingWith) || 0;
      return barValue;
    }
    //when working with a generic enemy's current stats, we need to check for temporary values
    //generic enemies are those who represent a character, yet none of their stats are linked
    if(workingWith == "current"
    && graphic.get("bar1_link") == ""
    && graphic.get("bar2_link") == ""
    && graphic.get("bar3_link") == ""){
      //roll20 stores token gmnotes in URI component
      var gmnotes = decodeURIComponent(graphic.get("gmnotes"));
      //create a hash of the temporary attributes
      var tempAttrs = new Hash(gmnotes);
      //are we editting the temporary attribute?
      if(options["setTo"] != undefined){
        tempAttrs[name] = options["setTo"];
        //record the change (while leaving any other notes in tact)
        if(tempAttrs.regex().test(gmnotes)){
            gmnotes = gmnotes.replace(tempAttrs.regex(),tempAttrs.toString());
        } else {
            gmnotes = gmnotes + "<br>" + tempAttrs.toString();
        }
        //return the gmnotes back into their URI Component form
        gmnotes = encodeURIComponent(gmnotes);
        graphic.set("gmnotes",gmnotes);
      }

      if(options["delete"]){
        delete tempAttrs[name];
        //record the change (while leaving any other notes in tact)
        if(tempAttrs.regex().test(gmnotes)){
            gmnotes = gmnotes.replace(tempAttrs.regex(),tempAttrs.toString());
        } else {
            gmnotes = gmnotes + "<br>" + tempAttrs.toString();
        }
        //return the gmnotes back into their URI Component form
        gmnotes = encodeURIComponent(gmnotes);
        graphic.set("gmnotes",gmnotes);
        if(options["show"]){
          whisper(name + " has been deleted.", msg.playerid);
        }
        return true;
      }
      //if the temporary attribute exists, report it.
      if(tempAttrs[name] != undefined){
        return tempAttrs[name];
      } //otherwise, we will work with the character sheet's attrubute
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
    //limit the attribute search to just this character
    var statObjs = findObjs({
      _type: "attribute",
      _characterid: options["characterid"],
      name: name
    });
    //does the character have this attribute?
    if(statObjs.length <= 0){
      //the attribute does not exist yet, if the user was looking for the value, quit
      if(options["setTo"] == undefined){
        //no stat to work with. report the error and exit.
        if(options["alert"]){whisper(character.get("name") + " does not have a(n) " + name + " Attribute.");}
        return undefined;
      } else {
        //the user is trying to create this value, go ahead and do so
        statObjs[0] = createObj("attribute", {
          name: name,
          current: options["setTo"],
          max: options["setTo"],
          characterid: character.id
        });
      }

    //does the character have too many attributes with this name?
    } else if(statObjs.length >= 2){
      //warn the gm, but continue forward
      if(options["alert"]){whisper("There were multiple " + name + " attributes owned by " + character.get("name") + ". Using the first one found. A log has been posted in the terminal.");}
      log(character.get("name") + "'s " + name + " Attributes");
      log(statObjs);
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
  }

  //are we editting the value?
  if(options["setTo"] != undefined){
    statObjs[0].set(workingWith,options["setTo"]);
  }

  //report the final value
  return statObjs[0].get(workingWith);
}
