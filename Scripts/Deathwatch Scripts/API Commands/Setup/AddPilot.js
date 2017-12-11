//allows the GM to add the details and attributes of a character to a vehicle,
//to function as the default pilot
//matches[1] - used to find the pilot to add
function addPilot(matches, msg){
  var pilotPhrase = matches[1];
  var pilots = suggestCMD('!addPilot $', pilotPhrase, msg.playerid, 'character');
  if(!pilots) return;
  var pilot = pilots[0];
  var pilotAttributes = [];
  var attributes = findObjs({
    _type: 'attribute',
    _characterid: pilot.id
  });

  _.each(attributes, function(attribute){
    var attributeCopy = {
      name: attribute.get('name'),
      value: attribute.get('max')
    };

    pilotAttributes.push(attributeCopy);
  });

  //add the single pilot to each selected roll20 character(vehicle)
  eachCharacter(msg, function(vehicle, graphic){
    var vehicleAttributes = findObjs({
      _type: 'attribute',
      _characterid: vehicle.id
    });

    var skipThisCharacter = false;
    _.each(vehicleAttributes, function(vehicleAttribute){
      _.each(pilotAttributes, function(pilotAttribute){
        if(vehicleAttribute.get('name') == pilotAttribute.name) {
          skipThisCharacter = true;
        }
      });
    });

    if(skipThisCharacter) return whisper('This vehicle already has a pilot.');
    _.each(pilotAttributes, function(attribute){
      createObj('attribute', {
        name: attribute.name,
        current: attribute.value,
        max: attribute.value,
        _characterid: vehicle.id
      });
    });

    //alert the gm of the success
    whisper('The pilot, ' + pilot.get('name') + ', was added to ' + vehicle.get('name') + '.');
  });
}

//waits until CentralInput has been initialized
on('ready', function(){
  CentralInput.addCMD(/^!\s*add\s*pilot\s+(.+)$/i, addPilot);
});
