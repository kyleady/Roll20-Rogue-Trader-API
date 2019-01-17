function lastWatchWave (matches, msg) {
  var Troops = Number(matches[1]);
  var Wave = matches[2] || '';
  Wave = Wave.trim();
  if(matches[2]) {
    Troops *= Math.ceil(Math.pow(1.5, Wave));
  }
  var Elite = 0;
  var Master = 0;
  var Chance = matches[3] || 60;
  Chance = Number(Chance);
  var MasterPotential = Math.floor(Troops / 16);
  for (var i = 0; i < MasterPotential; i++) {
    if (randomInteger(100) <= Chance) {
      Troops -= 16;
      Master++;
    }
  }
  var ElitePotential = Math.floor(Troops / 4);
  for (var i = 0; i < ElitePotential; i++) {
    if (randomInteger(100) <= Chance) {
      Troops -= 4;
      Elite++;
    }
  }

  var output = '';
  if (Master) output += 'Master: ' + Master + ", ";
  if (Elite) output += 'Elite: ' + Elite + ", ";
  if(Troops) output += 'Horde: ' + (Troops * 5);
  whisper(output.replace(/,\s*$/, ''));
}

on("ready", function(){
  CentralInput.addCMD(/^!\s*wave\s*(\d+)\s*(?:x\s*(\d+))?\s*(?:p\s*(\d+))?\s*$/i, lastWatchWave);
});
