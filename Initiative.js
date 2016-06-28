on("chat:message", function(msg) {
if(msg.type == "api" && msg.content == "!Init" && playerIsGM(msg.playerid)){
    var turnorder;
    if(Campaign().get("turnorder") == "") turnorder = []; //NOTE: We check to make sure that the turnorder isn't just an empty string first. If it is treat it like an empty array.
    //otherwise turn the turn order into an array
    else turnorder = JSON.parse(Campaign().get("turnorder"));
    log(msg.selected);
    //was anything selected?
    if(msg.selected == undefined || msg.selected.length <= 0){
        msg.selected = findObjs({                           
            _pageid: Campaign().get("playerpageid"),                              
            _type: "graphic"                         
        });
    }
    log(msg.selected);
    //work through each selected character
    _.each(msg.selected, function(obj){
        var graphic;
        //are we already holding a graphic?
        if(!obj._id && obj.get("_type") == "graphic"){
            //work with this graphic
            graphic = obj;
        } else {
            //otherwise find the graphic we are refering to
            graphic = getObj("graphic", obj._id);
        }
        //be sure the graphic exists
        if(graphic == undefined) {
            return sendChat(msg.who, "/w gm - graphic undefined.");
        }
        //be sure the character is valid
        var character = getObj("character",graphic.get("represents"))
        if(character == undefined){
            return sendChat(msg.who, "/w gm - character undefined.");
        }
        //create a turn obj
        var turnObj = {};
        //default to no custom text
        turnObj.custom = "";
        //record the id of the token
        turnObj.id = graphic.id;
        //calculate inititiative bonus
        var initiativeBonus = 0;
        if(!getAttrByName(character.id, "Detection")){
            //load up all the notes on the character
            var charNotes = "";
            var charGMNotes = "";
            character.get("bio",function(notes){charNotes = notes;});
            character.get("gmnotes",function(notes){charGMNotes = notes;});
            //rage quit if it's all empty
            if(charNotes == "" && charGMNotes == ""){
                return sendChat("System","/w gm Bio and GMNotes are empty.");
            }
            //add the agility bonus and unnatural agility
            initiativeBonus += Math.floor(Number(getAttrByName(character.id, "Ag"))/10) + Number(getAttrByName(character.id, "Unnatural Ag"));
            //is this character paranoid?
            if(charNotes.indexOf(">Paranoia<") != -1 || charGMNotes.indexOf(">Paranoia<") != -1){
                initiativeBonus += 2;
            }
            //does this character have lightning reflexes
            if(charNotes.indexOf(">Lightning Reflexes<") != -1 || charGMNotes.indexOf(">Lightning Reflexes<") != -1){
                initiativeBonus += Math.floor(Number(getAttrByName(character.id, "Ag"))/10) + Number(getAttrByName(character.id, "Unnatural Ag"));
            }
        } else {
            //add the detection bonus for starships
            initiativeBonus += Math.floor(Number(getAttrByName(character.id, "Detection"))/10);    
        }
        
        
        //roll for the initiative of the token
        var roll = randomInteger(10);
        //save the total initiative
        turnObj.pr = roll + initiativeBonus;
        //report the result to players if it is controlled by the player
        if(character.get("controlledby") != ""){
            sendChat("System",graphic.get("name") + " rolls a [[(" + roll.toString() + ")+" + initiativeBonus.toString() + "]] for Initiative.");
        } else {
            sendChat("System","/w gm " + graphic.get("name") + " rolls a [[(" + roll.toString() + ")+" + initiativeBonus.toString() + "]] for Initiative.");
        }
        //what is the index of where we will insert the token? (-1 flags it as not having been set)
        initiativeIndex = -1;
        //step through the turn order
        for(i = 0; i < turnorder.length; i++){
            //has this token already been included?
            if(turnObj.id == turnorder[i].id){
                //remove this entry
                turnorder.splice(i,1);
                //the array has shrunken, take a step back
                i--;
                log("Element removed.")
            //is the initiative of the new token higher AND has the initiativeIndex not been set yet?
            } else if(turnObj.pr > turnorder[i].pr && initiativeIndex == -1){
                //record the location in the array
                initiativeIndex = i;
            }
        }
        //was a place found for the initiativeIndex?
        if(initiativeIndex != -1){
            //add the turn object in the specified location
            turnorder.splice(initiativeIndex,0,turnObj);
        } else {
            //just add the turn object at the end
            turnorder.push(turnObj);
        }
    });
    log(turnorder)
    Campaign().set("turnorder", JSON.stringify(turnorder));
    log(Campaign().get("turnorder"));
}
});
