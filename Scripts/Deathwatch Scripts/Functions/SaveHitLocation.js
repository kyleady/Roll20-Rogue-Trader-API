//take the given roll and calculate the location
function saveHitLocation(roll, options){
  if(typeof options != 'object') options = {};
  //calculate Tens Location
  var tens = Math.floor(roll/10);
  //calculate Ones Location
  var ones = roll - 10 * tens;
  //load up the TensLocation variable to save the result in
  var attribObj = findObjs({ _type: 'attribute', name: 'TensLocation' })[0];
  attribObj.set('current',tens);
  //load up the OnesLocation variable to save the result in
  var attribObj = findObjs({ _type: 'attribute', name: 'OnesLocation' })[0];
  attribObj.set('current',ones);
  //where did you hit?
  var Location = '';
  switch(ones){
    case 10: case 0: Location = 'Head'; break;
    case 9: case 8:
      switch(tens % 2){
        case 0: Location = 'Right '; break;
        case 1: Location = 'Left '; break;
      } Location += 'Arm'; break;
    case 4: case 5: case 6: case 7: Location = 'Body'; break;
    case 3: case 2: case 1:
      switch(tens % 2){
        case 0: Location = 'Right '; break;
        case 1: Location = 'Left '; break;
      } Location += 'Leg'; break;
  }
  //send the total Damage at a 1 second delay
  if (options.whisper) {
    whisper(Location, {speakingAs: 'Location', delay: 100});
  } else {
    announce(Location, {speakingAs: 'Location', delay: 100});
  }
}
