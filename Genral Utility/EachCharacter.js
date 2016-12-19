/*
Ease of use function that applies a function to each character in msg.selected

msg is the object associated with each Chat Message. Specifically the function
is interested in msg.selected and msg.playerid

msg.selected contains the ids of every token selected. This function will
search for the character sheet associated with each token.
If no character sheet is associated with a token, that token will be ignored.

In the case that nothing is selected, the function will use the playerid to
search for a default character sheet. If the player is the gm, it will just
select every token **on the main player page**.


Inputs
  msg  - the object delivered when the chat:message event occurs
  func - the function used on each character
*/

function eachCharacter(msg, func){
  //was nothing selected?
  if(msg.selected == undefined || msg.selected.length <= 0){
    //are we defaulting to selecting everying on the player page?
    //gm only
    if(playerIsGM(msg.playerid)){
      //just select every token on the player's map that is not simply a
      //drawing and is on the object layer (the layer players can see and
      //interact with)
      msg.selected = findObjs({
          _pageid: Campaign().get("playerpageid"),
          _type: "graphic",
          _subtype: "token",
          isdrawing: false,
          layer: "objects"
      });
    //if the player is not a gm, then attempt to find the player's default token
    } else {
      //make the seleced array include the default character
      msg.selected = [defaultCharacter(msg.playerid)];
      //if there is no default character for the player, just quit.
      //the defaultCharacter() function has already warned the gm.
      if(msg.selected[0] == undefined){return;}
    }
  }

  //step through each token in msg.selected and attempt to find the associated
  //charactersheet
  _.each(msg.selected, function(obj){
    //normally msg.selected is just a list of objectids and types of the
    //objects you have selected. If this is the case, find the any
    //character objects associated with these objects.
    if(obj._type == "graphic"){
      var graphic = getObj("graphic", obj._id);
      //be sure the graphic exists
      if(graphic == undefined) {
        log("graphic undefined")
        log(obj)
        return whisper("graphic undefined");
      }

      //be sure the character is valid
      var character = getObj("character", graphic.get("represents"))
      if(character == undefined){
        log("character undefined")
        log(graphic)
        return whisper("character undefined");
      }
    //if the object's type is unique, just proceed anyways with an undefined
    //graphic and character
    } else if(obj._type == "unique"){
      var graphic = undefined;
      var character = undefined;
    //if using a default character, just accept the default character as the
    //the character we are working with, no need to work through tokens to
    //find this character
    } else if(typeof obj.get === "function" && obj.get("_type") == "character") {
      //record the character
      var character = obj;
      var graphic = undefined;

      //this may not return a valid token if there is no token on any of
      //the campaign pages, but I will be restricting non-gm's to only
      //inquire about their initiative and will not allow them to modify the
      //turn tracker. Thus, they will never need this default token. This
      //default token code is just here in case a different gm wishes to
      //allow players to roll their initiative.

      //when searching for a token that represents the character, prioritize
      //the page the player is currently on, next prioritize the page the main
      //group is on, lastly just accept any page.

      //is the player on their own page?
      if(Campaign().get("playerspecificpages") && Campaign().get("playerspecificpages")[msg.playerid]){
        //attempt to find a token linked to this character on the player's
        //current page
        graphic = findObjs({
          _pageid: Campaign().get("playerspecificpages")[msg.playerid],
          _type: "graphic",
          represents: character.id
        })[0];
      }

      //if a linked graphic has not been found, try searching for it on the
      //main player page
      if(graphic == undefined){
        graphic = findObjs({
          _pageid: Campaign().get("playerpageid"),
          _type: "graphic",
          represents: character.id
        })[0];
      }
      //if no token was found on the player page, then search for any token
      //in the Campaign
      if(graphic == undefined){
        graphic = findObjs({
          _type: "graphic",
          represents: character.id
        })[0];
      }

      //if there is still no token, warn the user and gm, then exit
      whisper(character.get("name") + " does not have a token on any map in the entire campaign.", msg.playerid);
      return whisper(character.get("name") + " does not have a token on any map in the entire campaign.");

    //if the gm just grabbed every single token on the map, you will already
    //have the graphic objects, and will need to find the character objects.
    } else if(typeof obj.get === "function" && obj.get("_type") == "graphic") {
      //record the graphic
      var graphic = obj;
      //be sure the character is valid
      var character = getObj("character",graphic.get("represents"))
      if(character == undefined){
        log("character undefined")
        log(graphic)
        return whisper("character undefined");
      }
    //if the selected object met none of the above criteria, alert the gm.
    } else{
      log("Selected is neither a graphic nor a character.")
      log(obj)
      return whisper("Selected is neither a graphic nor a character.");
    }

    //apply the function to this character and their character token (the graphic)
    func(character, graphic);
  });
}
