function damDetails() {
  //load up all of the damage variables, wherever they may be
  var details = {};
  details.DamType = findObjs({ _type: 'attribute', name: 'DamageType' })[0];
  details.Dam     = findObjs({ _type: 'attribute', name: "Damage" })[0];
  details.Pen     = findObjs({ _type: 'attribute', name: "Penetration" })[0];
  details.Fell    = findObjs({ _type: 'attribute', name: "Felling" })[0];
  details.Prim    = findObjs({ _type: 'attribute', name: "Primitive" })[0];
  details.Hits    = findObjs({ _type: 'attribute', name: "Hits"})[0];
  details.OnesLoc = findObjs({ _type: 'attribute', name: "OnesLocation"})[0];
  details.TensLoc = findObjs({ _type: 'attribute', name: "TensLocation"})[0];

  //be sure every variable was successfully loaded
  var successfulLoad = true;
  //warn the gm for each attribute that was not found
  if(details.DamType == undefined){
    successfulLoad = false;
    whisper("No attribute named Damage Type was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.Dam == undefined){
    successfulLoad = false;
    whisper("No attribute named Damage was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.Pen == undefined){
    successfulLoad = false;
    whisper("No attribute named Penetration was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.Fell == undefined){
    successfulLoad = false;
    whisper("No attribute named Felling was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.Prim == undefined){
    successfulLoad = false;
    whisper("No attribute named Primitive was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.Hits == undefined){
    successfulLoad = false;
    whisper("No attribute named Hits was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.OnesLoc == undefined){
    successfulLoad = false;
    whisper("No attribute named OnesLocation was found anywhere in the campaign. Damage was not recorded.");
  }
  if(details.TensLoc == undefined){
    successfulLoad = false;
    whisper("No attribute named TensLocation was found anywhere in the campaign. Damage was not recorded.");
  }
  //if just one was missing, don't return anything.
  if(successfulLoad == false){
    return;
  } else {
    //otherwise return everything
    return details;
  }

}
