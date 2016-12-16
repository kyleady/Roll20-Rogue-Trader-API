//a function which reduces the penetration and then damage of an attack with
//Primitive cover.

//matches[0] is the same as msg.content
//matches[1] is the positive numerical value of the cover's AP
function applyCover(matches,msg){
  //load up the relavant damage variables
  var DamObj = findObjs({ type: 'attribute', name: "Damage" })[0];
  var PenObj = findObjs({ type: 'attribute', name: "Penetration" })[0];
  var attributesUndefiend = false;
  if(DamObj == undefined){
    whisper("There is no Damage attribute in the campaign.");
    attributesUndefiend = true;
  }
  if(PenObj == undefined){
    whisper("There is no Penetration attribute in the campaign.");
    attributesUndefiend = true;
  }
  if(attributesUndefiend){
    return;
  }
  //reduce the penetration by half the cover
  var pen = Number(PenObj.get("current")) - Number(matches[1])/2;
  //has the cover been entirely used?
  if(pen >= 0){
    //record the remaining Penetration
    PenObj.set('current', Math.round(pen));
  } else {
    //record the 0 penetration left
    PenObj.set('current', 0);
    //reduce the damage by the remaining cover
    var dam = Number(DamObj.get("current")) + 2*pen;
    //does any cover remain?
    if(dam >= 0){
        //record the remaining damage
        DamObj.set('current', dam);
    } else {
        //record the remaining damage
        DamObj.set('current', 0);
    }
  }
  //alert the GM
  whisper("Dam: " + DamObj.get("current") + ", Pen: " + PenObj.get("current"));
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets the gm reduce damage and penetration when an attack passes through cover
  CentralInput.addCMD(/^!\s*cover\s*(\d+)$/i,applyCover);
});
