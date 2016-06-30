//medic command to heal a character up to their highest healing, while recording how high they healed to
//with these rules you can be healed as many times as you want, but each time you record how high you healed up to. After that, you can only heal up to that point until you receive proper care.
on("chat:message", function(msg) {
 if(msg.type == "api" && msg.content.indexOf("!Medic ") == 0 && msg.selected && msg.selected.length > 0 && playerIsGM(msg.playerid)){
    //get the number of wounds to be healed
    var Healing = Number(msg.content.substring(7).trim());
    //be sure the number is valid
    if(!Healing){
        sendChat("System","/w gm No healing to be done.")
        return;
    }
    _.each(msg.selected, function(obj){
        //get the character id of the selected token
        var graphic = getObj("graphic", obj._id);
        //be sure the graphic exists
        if(graphic == undefined) {
            return sendChat(msg.who, "/w gm - graphic undefined.");
        }
        //be sure the character is valid
        var character = getObj("character",graphic.get("represents"))
        if(character == undefined){
            return sendChat(msg.who, "/w gm - character undefined.");
        }
        //find the remaining wounds attribute
        var Woundsobjs = findObjs({
            _type: "attribute",
            _characterid: character.id,
            name: "Wounds"
        });
        //if there are no wounds objects, then this is not a character
        if(Woundsobjs.length <= 0){
            sendChat("System","/w gm " + character.get("name") + " has no wounds.");
            return;
        }
        //add the current Wounds to the healing done
        var NewWounds = Number(Woundsobjs[0].get("current")) + Healing;
        //find the Max Healing attribute
        var MaxHealingobjs = findObjs({
            _type: "attribute",
            _characterid: character.id,
            name: "Max Healing"
        });
        //does the Max Healing attribute exist?
        if(MaxHealingobjs.length > 0){
            //are the wounds more than the max healing allowed?
            if(NewWounds > MaxHealingobjs[0].get("current")){
                //reduce the new healed wounds to the cap
                NewWounds = MaxHealingobjs[0].get("current");
            }
            //set the Max Healing to the NewWounds
            MaxHealingobjs[0].set("current",NewWounds);
        } else {
            //the Max Healing Attribute does not exist yet.
            //are the wounds more than the max wounds?
            if(NewWounds > Woundsobjs[0].get("max")){
                //reduce the new healed wounds to the cap
                NewWounds = Woundsobjs[0].get("max");
            }
            //create a Max Healing attribute and set it to the NewWounds
            createObj("attribute", {
                name: "Max Healing",
                current: NewWounds,
                max: "",
                characterid: character.id
            });
        }
        //now that all the healing has been done, set the character's wounds wounds equal to the NewWounds
        Woundsobjs[0].set("current",NewWounds);
        //report the total healing
        sendChat("System", character.get("name") + " has been healed to " + NewWounds.toString() + " Wounds.");
        
    });
}
});

//whenever the wounds of a character is directly healed (assuming proper healing), then push up the Max Healing cap along with it
on("change:attribute:current", function(obj, prev) {
    //quit if the attribute changed was not Wounds
    if(obj.get("name") != "Wounds"){return;}
    
    //get the current and max wounds in number format
    var CurrentWounds = Number(obj.get("current"));
    var MaxWounds = Number(obj.get("max"));
    
    //quit if either the current or max wounds are not numbers
    if(CurrentWounds == NaN || MaxWounds == NaN){return;}
    
    //quit if the change was a net positive
    if(CurrentWounds - Number(prev.current) < 0){return;}
    
    //find the Max Healing attribute
    var MaxHealingobjs = findObjs({
        _type: "attribute",
        _characterid: obj.get("_characterid"),
        name: "Max Healing"
    });
    
    //be sure you found at least one Max Healing attribute
    if(MaxHealingobjs.length > 0){
        //record the Max Healing in number format
        var MaxHealing = Number(MaxHealingobjs[0].get("current"));
        
        //quit if Max Healing is not a number
        if(MaxHealing == NaN){return;}
        
        //is the new health greater than the current cap?
        if(CurrentWounds > MaxHealing){
            //is the new health greater than the max health?
            if(CurrentWounds > MaxWounds){
                //the healing cap can only go so far as maxHP, even in extreme circumstances
                MaxHealingobjs[0].set("current",obj.get("max"));
            } else {
                //record that the healing cap can only go this far
                MaxHealingobjs[0].set("current",obj.get("current"));
            }
            //report the new Healing Cap to the gm
            sendChat("System","/w gm Healing Cap set to " + MaxHealingobjs[0].get("current").toString() + "/" + obj.get("max").toString() + ".");
        }
    }
});