//used throughout DamageCatcher.js to whisper the full attack variables in a
//compact whisper
//matches[0] is the same as msg.content
//matches[1] is a flag for (|max)
function attackShow(matches,msg){
  //get the damage details obj
  var details = damDetails();
  //quit if one of the details was not found
  if(details == undefined){
    return;
  }

  if(matches && matches[1] && matches[1].toLowerCase() == "max"){
    matches[1] = "max";
  } else {
    matches = [];
    matches[1] = "current";
  }
  //starship damage only cares about the straight damage and if there is any
  //penetration at all
  if(details.DamType.get(matches[1]).toLowerCase() == "s"){
    if(details.Pen.get(matches[1])){
      whisper("Dam: [[" + details.Dam.get(matches[1]) + "]] Starship, Pen: true");
    } else {
      whisper("Dam: [[" + details.Dam.get(matches[1]) + "]] Starship, Pen: false");
    }
  //output normal damage
  } else {
    var output = "Dam: [[" + details.Dam.get(matches[1]) + "]] " + details.DamType.get(matches[1]);
    output += ", Pen: [[" +  details.Pen.get(matches[1]) + "]]";
    output += ", Felling: [[" + details.Fell.get(matches[1]) + "]]";
    output += ", Hits: [[" + details.Hits.get(matches[1]) + "]]";
    if(Number(details.Prim.get(matches[1]))) {
      whisper( output + ", Primitive");
    } else {
      whisper(output);
    }
  }
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets gm  view and edit damage variables with modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(dam|damage|pen|penetration|hits|fell|felling|prim|primitive)\s*(\?\s*\+|\?\s*-|\?\s*\*|\?\s*\/|=|\+\s*=|-\s*=|\*\s*=|\/\s*=)\s*(|\+|-)\s*(\d+|current|max|\$\[\[0\]\])\s*$/i, function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    attributeHandler(matches,msg,{partyStat: true});
  });
  //Lets gm view damage variables without modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(dam|damage|pen|penetration|hits|damtype|damage type|fell|felling|prim|primitive)\s*(\?)()()\s*$/i, function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    attributeHandler(matches,msg,{partyStat: true});
  });
  //Lets the gm set the damage type
  CentralInput.addCMD(/^!\s*(|max)\s*(damtype|damage type)\s*(=)\s*()(i|r|e|x|s)\s*$/i, function(matches,msg){
    matches[2] = 'DamageType';
    matches[5] = matches[5].toUpperCase();
    attributeHandler(matches,msg,{partyStat: true});
  });
  //Lets the gm view the attack variables in a susinct format
  CentralInput.addCMD(/^!\s*(|max)\s*attack\s*\?\s*$/i,attackShow);
});
