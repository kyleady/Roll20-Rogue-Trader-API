on("chat:message", function(msg) {
if(msg.type == "api" && msg.content == "!Cohesion"){
    //who are we talking to?
    var whisperTarget = msg.who;
    //shorten the target name to one word
    if(whisperTarget.indexOf(" ") != -1){
        whisperTarget = whisperTarget.substring(0,whisperTarget.indexOf(" "));
    }
    //load up the data storage
    var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
    //load up the cohesion variable
    //var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Cohesion" })[0];
    //whisper cohesion/cohesionMax
    sendChat("System","/w " + whisperTarget + " <strong>Cohesion</strong>: " + getAttrByName(storage.id,"Cohesion") + "/" + getAttrByName(storage.id,"Cohesion","max"))
    
} else if(msg.type == "api" && msg.content.indexOf("!Cohesion += ") == 0){
    //who are we talking to?
    var whisperTarget = msg.who;
    //shorten the target name to one word
    if(whisperTarget.indexOf(" ") != -1){
        whisperTarget = whisperTarget.substring(0,whisperTarget.indexOf(" "));
    }
    //load up the data storage
    var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
    //load up the cohesion variable
    var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Cohesion" })[0];
    
    //see if the input is sensible
    var addedCohesion = Number(msg.content.substring(13));
    if(!addedCohesion && addedCohesion != 0){
        return sendChat("System","/w " + whisperTarget + " cannot add " + msg.content.substring(13) + ".");
    }
    //see if the result is valid
    if(Number(getAttrByName(storage.id,"Cohesion")) + addedCohesion < 0){
        return sendChat("System","/w " + whisperTarget + " Not enough cohesion.");
    } else if(Number(getAttrByName(storage.id,"Cohesion")) + addedCohesion > Number(getAttrByName(storage.id,"Cohesion","max"))){
        sendChat("System","/w " + whisperTarget + " Cohesion cannot exceed the maximum of " + getAttrByName(storage.id,"Cohesion","max") + " cohesion.");
        addedCohesion = Number(getAttrByName(storage.id,"Cohesion","max")) - Number(getAttrByName(storage.id,"Cohesion"));
    } else if(Number(getAttrByName(storage.id,"Cohesion")) + addedCohesion == 0){
        sendChat("player|" + msg.playerid,"Squad Mode broken!")
    }
    //calculate cohesion
    attribObj.set("current",Number(getAttrByName(storage.id,"Cohesion")) + addedCohesion);
    //report modifier
    if(addedCohesion >= 0){
        //report addition
        sendChat("player|" + msg.playerid, "+" + addedCohesion + " Cohesion")
    } else {
        //report subtraction
        sendChat("player|" + msg.playerid, addedCohesion + " Cohesion")
    }
    //report resultant Cohesion
    sendChat("player|" + msg.playerid,"<strong>Cohesion</strong>: " + getAttrByName(storage.id,"Cohesion") + "/" + getAttrByName(storage.id,"Cohesion","max"));
} else if(msg.type == "api" && msg.content.indexOf("!Cohesion -= ") == 0){
    //who are we talking to?
    var whisperTarget = msg.who;
    //shorten the target name to one word
    if(whisperTarget.indexOf(" ") != -1){
        whisperTarget = whisperTarget.substring(0,whisperTarget.indexOf(" "));
    }
    //load up the data storage
    var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
    //load up the cohesion variable
    var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Cohesion" })[0];
    
    //see if the input is sensible
    var addedCohesion = Number(msg.content.substring(13));
    if(!addedCohesion && addedCohesion != 0){
        return sendChat("System","/w " + whisperTarget + " cannot subtract " + msg.content.substring(13) + ".");
    }
    //make the addition negative
    addedCohesion *= -1;
    //see if the result is valid
    if(Number(getAttrByName(storage.id,"Cohesion")) + addedCohesion < 0){
        return sendChat("System","/w " + whisperTarget + " Not enough cohesion.");
    } else if(Number(getAttrByName(storage.id,"Cohesion")) + addedCohesion > Number(getAttrByName(storage.id,"Cohesion","max"))){
        sendChat("System","/w " + whisperTarget + " Cohesion cannot exceed the maximum of " + getAttrByName(storage.id,"Cohesion","max") + " cohesion.");
        addedCohesion = Number(getAttrByName(storage.id,"Cohesion","max")) - Number(getAttrByName(storage.id,"Cohesion"));
    } else if(Number(getAttrByName(storage.id,"Cohesion")) + addedCohesion == 0){
        sendChat("player|" + msg.playerid,"Squad Mode broken!")
    }
    //calculate cohesion
    attribObj.set("current",Number(getAttrByName(storage.id,"Cohesion")) + addedCohesion);
    //report modifier
    if(addedCohesion >= 0){
        //report addition
        sendChat("player|" + msg.playerid, "+" + addedCohesion + " Cohesion")
    } else {
        //report subtraction
        sendChat("player|" + msg.playerid, addedCohesion + " Cohesion")
    }
    //report resultant Cohesion
    sendChat("player|" + msg.playerid,"<strong>Cohesion</strong>: " + getAttrByName(storage.id,"Cohesion") + "/" + getAttrByName(storage.id,"Cohesion","max"));
} else if(msg.type == "api" && msg.content.indexOf("!Cohesion = ") == 0 && playerIsGM(msg.playerid)){
    //load up the data storage
    var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
    //load up the cohesion variable
    var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Cohesion" })[0];
    
    //see if the input is sensible
    var newCohesion = Number(msg.content.substring(12));
    if(!newCohesion && newCohesion != 0){
        return sendChat("System","/w gm " + msg.content.substring(12) + " is an invalid input.");
    }
    //calculate cohesion
    attribObj.set("current",newCohesion);
    sendChat("GM","<strong>Cohesion</strong>: " + getAttrByName(storage.id,"Cohesion") + "/" + getAttrByName(storage.id,"Cohesion","max"));
} else if(msg.type == "api" && msg.content.indexOf("!MaxCohesion = ") == 0 && playerIsGM(msg.playerid)){
    //load up the data storage
    var storage =  findObjs({type: 'character', name: "Damage Catcher"})[0];
    //load up the cohesion variable
    var attribObj = findObjs({ type: 'attribute', characterid: storage.id, name: "Cohesion" })[0];
    
    //see if the input is sensible
    var newCohesion = Number(msg.content.substring(15));
    if(!newCohesion && newCohesion != 0){
        return sendChat("System","/w gm " + msg.content.substring(15) + " is an invalid input.");
    }
    //calculate cohesion
    attribObj.set("max",newCohesion);
    attribObj.set("current",newCohesion);
    sendChat("GM","<strong>Cohesion</strong>: " + getAttrByName(storage.id,"Cohesion") + "/" + getAttrByName(storage.id,"Cohesion","max"));
}
});
