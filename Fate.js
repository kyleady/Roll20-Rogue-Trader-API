on("chat:message", function(msg) {log(msg)});
on("chat:message", function(msg) {
    //Fate - spends a fate point if it is available
  if(msg.type == "api" && msg.content == ("!Fate")) {
      //be sure the sender has a represented token selected
      // && msg.selected[0].represents != undefined
    if(msg.selected){
        //find the character the token represents
        var graphic = getObj("graphic", msg.selected[0]._id);
        //be sure the graphic is valid
        if(graphic == undefined){
            sendChat(msg.who, "/em - graphic undefined.") 
            return;
        }
        //be sure the character is valid
        var character = getObj("character",graphic.get("represents"))
        if(character == undefined){
            sendChat(msg.who, "/em - character undefined.") 
            return;
        }
        
        //if the character has Fate and it is above zero...
        if(getAttrByName(character.id, "Fate") && getAttrByName(character.id, "Fate") > 0)
        {
            //Find the Fate attribute on the selected Character
            var attribObj = findObjs({ type: 'attribute', characterid: character.id, name: "Fate" })[0];
            //reduce the fate points by one
            var Fate = attribObj.get('current') -1;
            attribObj.set('current', Fate);
            //tell everyone that msg.who used a fate point and how many fate points they have left
            sendChat(msg.who, "/em - Fate Point used. " + getAttrByName(character.id, "Fate") + " Fate Points remain.")
        }
        else //otherwise the Character cannot spend fatepoints
        {
            sendChat(msg.who, "/em - The Emperor does not love you. No fate point is expended.")
        }
    }
    else {
        
        sendChat(msg.who, "/em - Please select a character.")
    }
  }  //FateReset - Resets every character's Fate Points back to their maximum
     //only the GM may actiavate this function
  else if(msg.type == "api" && msg.content == ("!FateReset") && msg.who.indexOf(" (GM)") !== -1)
  {
    //create a list of every single character in the campaign  
    var characters = findObjs({ type: 'character'});
    for (i = 0; i < characters.length; i++) 
    {
        //for every single character, find their Fate Attribute
        if(findObjs({ type: 'attribute', characterid: characters[i].id, name: "Fate" }).length > 0)
        {
            var attribObj = findObjs({ type: 'attribute', characterid: characters[i].id, name: "Fate" })[0];
            //set each character's fate back to its maxiumum
            var Fate = attribObj.get('max');
            attribObj.set('current', Fate);
        }
    }
    //inform the gm that the function has completed successfully
    sendChat(msg.who,"/w gm Fate has been reset.")
  } else if(msg.type == "api" && msg.content.indexOf("!Output ") == 0){
      sendChat("System","/w gm " + msg.content.substring(8));
  }
});
