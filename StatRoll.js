function statRoll(statName,who,selected,modifier,whisper){
    //define the variables
    var stat;
    var unnatural_stat;
    var aging;
    var name;
    var reason = "";
    var piece = "";
    //default the inputs
    if(!whisper){
        //whisper = "/em - ";
        whisper = "";
    } else {
        whisper = "/w gm ";
    }
    //find the reason and modifier
    if(modifier.indexOf(" ") != -1){
        reason = modifier.substring(modifier.indexOf(" "));
        modifier = Number(modifier.substring(0,modifier.indexOf(" ")));
    } else {
        modifier = Number(modifier);
    }
    //be sure the modifier is sensible
    if(!modifier){
        modifier = 0;
    }
    //work through each selected character
    _.each(selected, function(obj){
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
        //load up the stats
        stat = Number(getAttrByName(character.id, statName));
        unnatural_stat = Number(getAttrByName(character.id, "Unnatural " + statName));
        //load up the name
        name = character.get("name");
        //default the stats
        if(!stat){
            stat = 0;
        }
        if(!unnatural_stat){
            unnatural_stat = 0;
        }
        //override a whisper for secret characters
        if(character.get("controlledby") == ""){
            //output the roll
            sendChat(who,"/w gm &{template:default} {{name=<strong>" + statName +  "</strong>: " + name + "}} {{Successes=[[(" + stat.toString() + "+" + modifier.toString() + "-D100)/10]]}} {{Unnatural= [[ceil((" + unnatural_stat.toString() + ")/2)]]}}")
            //sendChat(who,whisper + name + " rolls [[(" + stat.toString() + "+" + modifier.toString() + "-D100)/10]](+[[" + unnatural_stat.toString() + "]]) successes on a " + statName +  " test." + reason);    
        } else {
            //add any penalties for aging
            aging = Number(getAttrByName(character.id,"Age").substring(0,getAttrByName(character.id,"Age").indexOf(" years")));
            //aging shouldn't take affect until the age of 25
            aging -= 25;
            //reduce the effects of aging by any potions of youth, etc
            aging -= Number(getAttrByName(character.id, "Juvenat"));
            //reduce the effects of aging by any corruption
            aging -= Number(getAttrByName(character.id, "Corruption")) + Number(getAttrByName(character.id, "Unnatural Corruption"))*10;
            //be sure the penalties don't turn into bonuses
            if(aging < 0 || !aging){aging = 0;}
            //add in the penalty
            stat -= aging;
            //output the roll
            sendChat(who,whisper + "&{template:default} {{name=<strong>" + statName +  "</strong>: " + name + "}} {{Successes=[[(" + stat.toString() + "+" + modifier.toString() + "-D100)/10]]}} {{Unnatural= [[ceil((" + unnatural_stat.toString() + ")/2)]]}}")
            //sendChat(who,whisper + name + " rolls [[(" + stat.toString() + "+" + modifier.toString() + "-D100)/10]](+[[" + unnatural_stat.toString() + "]]) successes on a " + statName +  " test." + reason);
        }
        
    });    
}

on("chat:message", function(msg) {
if(msg.type == "api" && (msg.content == "!WS" || msg.content.indexOf("!WS ") == 0)){
    statRoll("WS","player|" + msg.playerid,msg.selected,msg.content.substring(3).trim());
} else if(msg.type == "api" && (msg.content == "!BS" || msg.content.indexOf("!BS ") == 0)){
    statRoll("BS","player|" + msg.playerid,msg.selected,msg.content.substring(3).trim());
} else if(msg.type == "api" && (msg.content == "!S" || msg.content.indexOf("!S ") == 0)){
    statRoll("S","player|" + msg.playerid,msg.selected,msg.content.substring(3).trim());
} else if(msg.type == "api" && (msg.content == "!T" || msg.content.indexOf("!T ") == 0)){
    statRoll("T","player|" + msg.playerid,msg.selected,msg.content.substring(3).trim());
} else if(msg.type == "api" && (msg.content == "!Ag" || msg.content.indexOf("!Ag ") == 0)){
    statRoll("Ag","player|" + msg.playerid,msg.selected,msg.content.substring(3).trim());
} else if(msg.type == "api" && (msg.content == "!Pr" || msg.content.indexOf("!Pr ") == 0)){
    statRoll("Per","player|" + msg.playerid,msg.selected,msg.content.substring(3).trim());
} else if(msg.type == "api" && (msg.content == "!It" || msg.content.indexOf("!It ") == 0)){
    statRoll("It","player|" + msg.playerid,msg.selected,msg.content.substring(3).trim());
} else if(msg.type == "api" && (msg.content == "!Wp" || msg.content.indexOf("!Wp ") == 0)){
    statRoll("Wp","player|" + msg.playerid,msg.selected,msg.content.substring(3).trim());
} else if(msg.type == "api" && (msg.content == "!Fe" || msg.content.indexOf("!Fe ") == 0)){
    statRoll("Fe","player|" + msg.playerid,msg.selected,msg.content.substring(3).trim());
} else if(msg.type == "api" && (msg.content == "!gmWS" || msg.content.indexOf("!gmWS ") == 0)){
    statRoll("WS","player|" + msg.playerid,msg.selected,msg.content.substring(5).trim(),true);
} else if(msg.type == "api" && (msg.content == "!gmBS" || msg.content.indexOf("!gmBS ") == 0)){
    statRoll("BS","player|" + msg.playerid,msg.selected,msg.content.substring(5).trim(),true);
} else if(msg.type == "api" && (msg.content == "!gmS" || msg.content.indexOf("!gmS ") == 0)){
    statRoll("S","player|" + msg.playerid,msg.selected,msg.content.substring(5).trim(),true);
} else if(msg.type == "api" && (msg.content == "!gmT" || msg.content.indexOf("!gmT ") == 0)){
    statRoll("T","player|" + msg.playerid,msg.selected,msg.content.substring(5).trim(),true);
} else if(msg.type == "api" && (msg.content == "!gmAg" || msg.content.indexOf("!gmAg ") == 0)){
    statRoll("Ag","player|" + msg.playerid,msg.selected,msg.content.substring(5).trim(),true);
} else if(msg.type == "api" && (msg.content == "!gmPr" || msg.content.indexOf("!gmPr ") == 0)){
    statRoll("Per","player|" + msg.playerid,msg.selected,msg.content.substring(5).trim(),true);
} else if(msg.type == "api" && (msg.content == "!gmIt" || msg.content.indexOf("!gmIt ") == 0)){
    statRoll("It","player|" + msg.playerid,msg.selected,msg.content.substring(5).trim(),true);
} else if(msg.type == "api" && (msg.content == "!gmWp" || msg.content.indexOf("!gmWp ") == 0)){
    statRoll("Wp","player|" + msg.playerid,msg.selected,msg.content.substring(5).trim(),true);
} else if(msg.type == "api" && (msg.content == "!gmFe" || msg.content.indexOf("!gmFe ") == 0)){
    statRoll("Fe","player|" + msg.playerid,msg.selected,msg.content.substring(5).trim(),true);
}
});
