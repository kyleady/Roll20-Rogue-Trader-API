//a function which converts the numer of successes into a number of Hits
//if a number of hits is not specified, it will default to the number of
//successes saved in the last roll. The number will be negative as the number
//of Hits is 1 by default. This function converts that negative number into
//a positive number by the Full Auto formula.
function fullautoConverter(matches,msg){
  //record the number of hits
  var HitsObj = findObjs({ _type: 'attribute', name: "Hits" })[0];
  //besure there is a Hits Attribute to work with
  if(HitsObj == undefined){
    return whisper("No attribute named Hits was found anywhere in the campaign.");
  }

  //did the user specify a number of Successes?
  if(matches[1] != ""){
    var Hits = Number(matches[1]) + 1;
  //otherwise, default to the numer of succeses recorded from the last roll to
  //hit
  } else {
    //check if the stored number of successes has already been converted
    if(HitsObj.get("current") > 0){
      return whisper("Number of successes has already been converted into " + HitsObj.get("current") + " hits. Aborting.");
    }
    //convert the number of successes into hits
    var Hits = (-1) * HitsObj.get("current");
  }

  //Round the number of hits, just in case
  Hits = Math.round(Hits);

  //Save the number of hits.
  HitsObj.set("current",Hits);

  //Report the number of hits
  whisper("Hits: " + HitsObj.get("current"));
}

//a function which converts the numer of successes into a number of Hits
//if a number of hits is not specified, it will default to the number of
//successes saved in the last roll. The number will be negative as the number
//of Hits is 1 by default. This function converts that negative number into
//a positive number by the Semi Auto formula.
function semiautoConverter(matches,msg){
  //record the number of hits
  var HitsObj = findObjs({ _type: 'attribute', name: "Hits" })[0];
  //besure there is a Hits Attribute to work with
  if(HitsObj == undefined){
    return whisper("No attribute named Hits was found anywhere in the campaign.");
  }

  //did the user specify a number of Successes?
  if(matches[1] != ""){
    var Hits = Math.floor(Number(matches[1]) / 2) + 1;
  //otherwise, default to the numer of succeses recorded from the last roll to
  //hit
  } else {
    //check if the stored number of successes has already been converted
    if(HitsObj.get("current") > 0){
      return whisper("Number of successes has already been converted into " + HitsObj.get("current") + " hits. Aborting.");
    }
    //convert the number of successes into hits
    var Hits = Math.floor( ((-1) * Number(HitsObj.get("current")) - 1) / 2 ) + 1;
  }

  //Round the number of hits, just in case
  Hits = Math.round(Hits);

  //Save the number of hits.
  HitsObj.set("current",Hits);

  //Report the number of hits
  whisper("Hits: " + HitsObj.get("current"));
}

//waits until CentralInput has been initialized
on("ready",function(){
  //Lets the gm convert the number of successes into Hits, as per the Full Auto formula
  CentralInput.addCMD(/^!\s*full\s*(?:auto)?\s*=?\s*(\d*)\s*$/i,fullautoConverter);
  //Lets the gm convert the number of successes into Hits, as per the Semi Auto formula
  CentralInput.addCMD(/^!\s*semi\s*(?:auto)?\s*=?\s*(\d*)\s*$/i,semiautoConverter);
});
