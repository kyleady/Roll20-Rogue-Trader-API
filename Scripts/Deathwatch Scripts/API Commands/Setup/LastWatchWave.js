function lastWatchWave (matches, msg) {
  var Troops = Number(matches[1]);
  var Elite = 0;
  var Master = 0;
  var Chance = matches[2] || 4;
  Chance = Number(Chance);
  var MasterPotential = Math.floor(Troops / 16);
  for (var i = 0; i < MasterPotential; i++) {
    if (randomInteger(10) >= 4) {
      Troops -= 16;
      Master++;
    }
  }
  var ElitePotential = Math.floor(Troops / 4);
  for (var i = 0; i < ElitePotential; i++) {
    if (randomInteger(10) >= 4) {
      Troops -= 4;
      Elite++;
    }
  }

  var output = '';
  if (Master) output += 'Master: ' + Master + ", ";
  if (Elite) output += 'Elite: ' + Elite + ", ";
  if(Troop) output += 'Horde: ' + (Troop * 5);
  whisper(output.replace(/,$/, ''));
}

on("ready", function(){
  CentralInput.addCMD(/^!\s*last\s*watch\s*wave\s*(\d+)\s*(?:|\s*(\d+)\s*)?$/i, lastWatchWave);
});
