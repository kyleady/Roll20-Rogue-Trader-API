//used inside initiativeHandler() multiple times, this calculates the bonus
//added to the D10 when rolling Initiative for the character/starship
function calcInitBonus(charObj, graphicObj, initCallback){
  charObj = charObj || {};
  graphicObj = graphicObj || {};
  //if this character sheet has Detection, then it is a starship
  if (
    findObjs({
      _type: "attribute",
      name: "Initiative",
      _characterid: charObj.id
    })[0] != undefined
  ){
    var initBonus = Number(attributeValue("Initiative", {characterid: charObj.id, graphicid: graphicObj.id}));
    if(typeof initCallback == 'function') initCallback(initBonus);
  } else if(
    findObjs({
      _type: "attribute",
      name: "Detection",
      _characterid: charObj.id
    })[0] != undefined
  ){
    //report the detection bonus for starships
    var Detection = Number(attributeValue("Detection", {characterid: charObj.id, graphicid: graphicObj.id}));
    var DetectionBonus = Math.floor(Detection/10);
    if(typeof initCallback == 'function') initCallback(DetectionBonus);
  //if this character sheet has Ag, then it rolls initiative like normal.
  } else if(
    findObjs({
      _type: "attribute",
      name: "Ag",
      _characterid: charObj.id
    })[0] != undefined
  ) {
    //load up all the notes on the character
    new INQCharacter(charObj, graphicObj, function(inqcharacter){
      var Agility = Number(attributeValue("Ag", {characterid: charObj.id, graphicid: graphicObj.id}));
      //add the agility bonus and unnatural agility
      var initiativeBonus = Math.floor(Agility/10);
      //only add the Unnatural Ag attribute, if it exists
      var UnnaturalAgility = Number(attributeValue("Unnatural Ag", {characterid: charObj.id, graphicid: graphicObj.id}));
      if(UnnaturalAgility){
        initiativeBonus += UnnaturalAgility;
      }

      //does this character have lightning reflexes?
      if(inqcharacter.has("Lightning Reflexes", "Talents")){
          //double their Agility Bonus
          initiativeBonus *= 2;
      }

      //is this character paranoid?
      if(inqcharacter.has("Paranoia", "Talents")){
          //add two to the final result
          initiativeBonus += 2;
      }

      if(typeof initCallback == 'function') initCallback(initiativeBonus);
    });
  //neither Ag nor Detection were found. Warn the gm and exit.
  } else {
    whisper( graphicObj.get("name") + " did not have an Ag or Detection attribute. Initiative was not rolled.");
    if(typeof initCallback == 'function') initCallback();
  }
}
