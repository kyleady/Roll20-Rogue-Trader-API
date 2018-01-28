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
    var value = "max";
  } else {
    var value = "current";
  }
  //starship damage only cares about the straight damage and if there is any
  //penetration at all
  if(details.DamType.get(value).toLowerCase() == "s"){
    if(details.Pen.get(value)){
      whisper("Dam: [[" + details.Dam.get(value) + "]] Starship, Pen: true");
    } else {
      whisper("Dam: [[" + details.Dam.get(value) + "]] Starship, Pen: false");
    }
  //output normal damage
  } else {
    var output = "Dam: [[" + details.Dam.get(value) + "]] " + details.DamType.get(value);
    output += ", Pen: [[" +  details.Pen.get(value) + "]]";
    output += ", Felling: [[" + details.Fell.get(value) + "]]";
    output += ", Hits: [[" + details.Hits.get(value) + "]]";
    if(Number(details.Prim.get(value))) output += ', Primitive';
    if(Number(details.Ina.get(value))) output += ', Ignores Natural Armour';
    whisper(output);
  }
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets gm  view and edit damage variables with modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(dam(?:age)?|pen(?:etration)?|hits|dam(?:age)\s*type|fell(?:ing)?|prim(?:itive)?|Ignores?\s*Natural\s*Armou?r)\s*(\?\s*\+|\?\s*-|\?\s*\*|\?\s*\/|=|\+\s*=|-\s*=|\*\s*=|\/\s*=)\s*(|\+|-)\s*(\d+|current|max|\$\[\[0\]\])\s*$/i, function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    attributeHandler(matches,msg,{partyStat: true});
  });
  //Lets gm view damage variables without modifiers
  CentralInput.addCMD(/^!\s*(|max)\s*(dam(?:age)?|pen(?:etration)?|hits|dam(?:age)\s*type|fell(?:ing)?|prim(?:itive)?|Ignores?\s*Natural\s*Armou?r)\s*(\?)()()\s*$/i, function(matches,msg){
    matches[2] = getProperStatName(matches[2]);
    attributeHandler(matches,msg,{partyStat: true});
  });
  //Lets the gm set the damage type
  CentralInput.addCMD(/^!\s*(|max)\s*(dam(?:age)?\s*type)\s*(=)\s*()(i|r|e|x|s)\s*$/i, function(matches,msg){
    matches[2] = 'DamageType';
    matches[5] = matches[5].toUpperCase();
    attributeHandler(matches,msg,{partyStat: true});
  });
  //Lets the gm view the attack variables in a susinct format
  CentralInput.addCMD(/^!\s*(|max)\s*attack\s*\?\s*$/i,attackShow);
});
