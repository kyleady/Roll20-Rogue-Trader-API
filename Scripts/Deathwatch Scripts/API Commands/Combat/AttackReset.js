//resets all the damage variables to their maximum values (the attack before any
//modifications)
function attackReset(matches,msg){
  //get the damage details obj
  var details = damDetails();
  //quit if one of the details was not found
  if(details == undefined){
    return;
  }
  //reset the damage variables to their maximums
  for(var k in details){
    details[k].set("current",details.get("max"));
  }
  //report the resut
  attackShow()
}

on('ready', function(){
  //Lets the gm reset an attack back to how it was first detected, before
  //modifications
  CentralInput.addCMD(/^!\s*attack\s*=\s*max$/i, attackReset);
});
