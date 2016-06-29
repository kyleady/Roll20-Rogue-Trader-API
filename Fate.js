on("chat:message", function(msg) {log(msg)});
on("chat:message", function(msg) {
    //Fate - spends a fate point if it is available
  if(msg.type == "api" && msg.content == ("!Fate")) {
    //be sure the sender has at least one token selected
    if(msg.selected){
		//make each token spend a fate point if it can
		_.each(msg.selected,function(obj){
			//find the character the token represents
			var graphic = getObj("graphic", obj._id);
			//be sure the graphic is valid
			if(graphic == undefined){
				//have the player tell the GM what went wrong
				sendChat(msg.who, "/w gm !Fate: graphic undefined.");
				return;
			}
			//be sure the character is valid
			var character = getObj("character",graphic.get("represents"))
			if(character == undefined){
				//have the player tell the GM what went wrong
				sendChat(msg.who, "/w gm !Fate: character undefined.");
				return;
			}
			
			//if the character has Fate and it is above zero...
			if(getAttrByName(character.id, "Fate") && getAttrByName(character.id, "Fate") > 0)
			{
				//get an editable version of the Fate Attribute from the Character
				var attribObj = findObjs({ type: 'attribute', characterid: character.id, name: "Fate" })[0];
				//reduce the fate points by one
				var Fate = attribObj.get('current') -1;
				attribObj.set('current', Fate);
				//tell everyone that msg.who used a fate point and how many fate points the selected character has left.
				sendChat(msg.who, "/em - Fate Point spent. " + getAttrByName(character.id, "Fate") + " Fate Points remain for " + character.get("name") + ".");
			}
			else //otherwise the Character cannot spend fatepoints
			{
				sendChat(msg.who, "/em - The Emperor does not love you. " + character.get("name")  + " has no Fate Points to spend.");
			}
		});
	}
	else {
		//alert the gm that the player tried to spend Fate Points while having no one selected
		sendChat(msg.who, "/w gm !Fate: Nothing selected.");
	}	
  }  
  
//FateReset - Resets the selected characters' Fate Points back to their maximum
//only the GM may actiavate this function
else if(msg.type == "api" && msg.content == ("!FateReset") && playerIsGM(msg.playerid)){
	//be ready to alert the gm if no characters had their fate points restored
	var NothingAccomplished = true;
	//be sure the sender has at least one token selected
    if(msg.selected){
		//make each token spend a fate point if it can
		_.each(msg.selected,function(obj){
			//find the character the token represents
			var graphic = getObj("graphic", obj._id);
			//be sure the graphic is valid
			if(graphic == undefined){
				//have the player tell the GM what went wrong
				sendChat(msg.who, "/w gm !Fate: graphic undefined.");
				return;
			}
			//be sure the character is valid
			var character = getObj("character",graphic.get("represents"))
			if(character == undefined){
				//have the player tell the GM what went wrong
				sendChat(msg.who, "/w gm !Fate: character undefined.");
				return;
			}
			
			//only reset Fate, if the character has Fate
			if(getAttrByName(character.id, "Fate")){
				//get an editable version of the Fate Attribute from the Character
				var attribObj = findObjs({ type: 'attribute', characterid: character.id, name: "Fate" })[0];
				
				//set each character's fate back to its maxiumum
				attribObj.set('current', attribObj.get('max'));
				
				//inform the gm that the function has completed successfully for this character
				sendChat(msg.who,"/w gm Fate has been reset: " + character.get("name") );
				
				//record that we were able to restore the Fate Points of at least one character
				NothingAccomplished = false;
			}
		});
	}
	//if we reached the end of FateReset and nothing was accomplished, you should let the gm know
	if(NothingAccomplished){
		sendChat("System", "/w gm !FateReset did not restore any Fate Points!");
	}
}
});
