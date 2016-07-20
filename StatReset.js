on("chat:message", function(msg) {
    //TokenReset - Reset every attribute to its maxium (except Fatigue, set it to zero)
    //only the GM may activate this function
  if(msg.type == "api" && msg.content == ("!ResetToken") && msg.who.indexOf(" (GM)") !== -1)
  {  
    //be sure the sender has a token selected
    if(msg.selected){
        //run this function on every object selected
         _.each(msg.selected, function(obj){
         var graphic = getObj("graphic", obj._id);
        //be sure the graphic exists
        if(graphic == undefined){
            sendChat("System", "/w gm Not a graphic.") 
            return;
        }
        //find the character the token represents
        var character = getObj("character",graphic.get("represents"))
        //be sure the character exists
        if(character == undefined){
            sendChat("System", "/w gm Not a character.") 
            return;
        }
        
        //this is the list of all the attributes that will be reset
        //var AttributeList = ['WS',"BS","S","T","Ag","Per","Wp","It","Fe","Fate","Insanity","Corruption","Wounds","Fatigue","PR","Armour_H","Armour_B","Armour_RL","Armour_LL","Armour_RA","Armour_LA","Unnatural WS","Unnatural BS","Unnatural S","Unnatural T","Unnatural Ag","Unnatural Wp","Unnatural It","Unnatural Per","Unnatural Fe","Structural Integrity","Armour_F","Armour_S","Armour_R","Manoeuvrability"]
        var AttributeList = findObjs({ type: 'attribute', characterid: character.id});
        
        for(var i = 0; i < AttributeList.length; i++) {
            //if reseting Fatigue...
            if(AttributeList[i].get("name") == "Fatigue")
            {
                //Fatigue is reset to 0
                AttributeList[i].set('current', 0);
            }
            else
            {
                //all other attributes are reset to their maximums
                var attribMax = AttributeList[i].get('max');
                AttributeList[i].set('current', attribMax);
            }
        }
        
        //reset Fatigue Bar
        graphic.set("bar1_value","0");
        
        //reset Fate Bar
        graphic.set("bar2_value",graphic.get("bar2_max"));
        
        //reset Wounds Bar
        graphic.set("bar3_value",graphic.get("bar3_max"));
        
        //clear all status markers
        graphic.set("statusmarkers", "");
        
        //inform the gm which token has been reset
        sendChat(msg.who, "/w gm - " + character.get("name") + " has been reset.");
         }); //close _.each
    } else {
        sendChat("System","/w gm Nothing Selected.");
    }
  }
  });
