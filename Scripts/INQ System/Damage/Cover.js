//a function which reduces the penetration and then damage of an attack with
//Primitive cover.

//matches[0] is the same as msg.content
//matches[1] is the positive numerical value of the cover's AP
//matches[2] is a flag to determine if the cover is primitive
function applyCover(matches,msg){
  //load up the relavant damage variables
  var details = damDetails();
  if(details == undefined){return;}

  //get the cover from the user
  var cover = Number(matches[1]) || 0;
  //determine if the the cover is primitive
  var primitiveCover = matches[2] != "" || false;

  //determine how effective the attack is against the cover
  var attackMultiplier = 1;

  //primitive cover means the attack is twice as effective against the cover
  if(primitiveCover){
    attackMultiplier *= 2;
  }

  //a primitive attack means the attack is half as effective against the cover
  if(Number(details.Prim)){
    attackMultiplier /= 2;
  }

  //Apply Cover=================================================================

  //Penetration is twice as effective as Damage
  attackMultiplier *= 2;

  //Reduce the Penetration by the Cover (accounting for the multiplier)
  var pen = Number(details.Pen.get("current"))
  pen -= ( cover / attackMultiplier );
  //and round the result
  pen = Math.round(pen);

  //has the cover been entirely used?
  if(pen >= 0){
    //record the remaining Penetration
    details.Pen.set('current', pen);
  } else {
    //record that 0 penetration is left
    details.Pen.set('current', 0);

    //determine the remaining damage after cover
    var dam = Number(details.Dam.get("current"));
    //the penetration ended up negative, apply it to the damage next
    //also multiply by two to negate the double effectiveness of the penetration
    dam += pen*2;
    //and round the result
    dam = Math.round(pen);

    //does any cover remain?
    if(dam >= 0){
        //record the remaining damage
        details.Dam.set('current', dam);
    } else {
        //record the remaining damage
        details.Dam.set('current', 0);
    }
  }
  //alert the GM
  whisper("Dam: " + details.Dam.get("current") + ", Pen: " + details.Pen.get("current"));
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets the gm reduce damage and penetration when an attack passes through cover
  CentralInput.addCMD(/^!\s*cover\s*(\d+)\s*(|p|prim|primitive)\s*$/i,applyCover);
});
