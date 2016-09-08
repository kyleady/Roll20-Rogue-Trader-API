function Hash(hashString) {
  //allow users to access a regex for recognized items within the hash
  this.itemRegex = function(options){
    //default to no options
    options = options || [];
    var itemRegexTxt = "([a-zA-Z0-9][a-zA-Z0-9\\s]*):\\s*\"([a-zA-Z0-9\\s]*)\"";
    if(options["text"]){
      return itemRegexTxt;
    } else {
      return new RegExp(itemRegexTxt,options["flags"]);
    }
  }

  //allow users to access a regex for recognized hashes
  this.hashRegex = function(options){
    //default to no options
    options = options || [];
    //being with curly braces
    var hashRegexTxt = "(?:\\s|<br>)*\\{";
    //within the curly braces, allow for multiple text entries preceeded by a label
    hashRegexTxt += "(?:\\s|<br>)*(?:" + this.itemRegex({text: true}) + "(?:\\s|<br>)*,(?:\\s|<br>)*)*(?:" + this.itemRegex({text: true}) + ")?(?:\\s|<br>)*";
    //end with curly braces
    hashRegexTxt += "\\}(?:\\s|<br>)*";
    if(options["text"]){
      return hashRegexTxt;
    } else {
      return new RegExp(hashRegexTxt, options["flags"]);
    }
  }

  //outputs the hash as a string
  this.toString = function(){
      var output = "{";
      for(var k in this){
        //ignore any utility functions included in the hash
        if(!(typeof this[k] === 'function')){
            output += k + ": \"" + this[k] + "\", ";
        }
      }
      //remove the last comma
      output = output.substring(0,output.length-2);
      output += "}";
      return output;
  }

  //default the hashString to something empty
  hashString = hashString || "{}";

  //find the valid part of the hashString
  if(this.hashRegex().test(hashString)){
    hashString = hashString.match(this.hashRegex())[0];
  } else {
    return;
  }

  //get a list of the items in the hash
  var itemList = hashString.match(this.itemRegex({flags: "g"}));
  //default to an empty list
  itemList = itemList || [];
  var itemRegex = this.itemRegex();
  //record each value with their associated key
  for(var i = 0; i < itemList.length; i++){
    var matches = itemList[i].match(itemRegex);
    this[matches[1]] = matches[2];
  }
}

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
        if(tempAttrs.hashRegex().test(gmnotes)){
            gmnotes = gmnotes.replace(tempAttrs.hashRegex(),tempAttrs.toString());
        } else {
            gmnotes = gmnotes + "<br>" + tempAttrs.toString();
        }
        gmnotes = gmnotes.replace(tempAttrs.hashRegex(),tempAttrs.toString());
        //return the gmnotes back into their URI Component form
        gmnotes = encodeURIComponent(gmnotes);
        graphic.set("gmnotes",gmnotes);
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
      //no stat to work with. report the error and exit.
      if(options["alert"]){whisper(character.get("name") + " does not have a(n) " + name + " Attribute.");}
      return undefined;
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
