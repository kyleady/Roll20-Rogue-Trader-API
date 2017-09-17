INQAttack = INQAttack || {};
//determine the effective psy rating of the character
INQAttack.calcEffectivePsyRating = function(){
  //reset the psy rating for each selected character
  INQAttack.PsyRating = undefined;
  //allow the options to superceed the character's psy rating
  if(INQAttack.options.EffectivePR){
    INQAttack.PsyRating = Number(INQAttack.options.EffectivePR);
  }
  //if no effective psy rating is set, default to the character's psy rating
  if(INQAttack.PsyRating == undefined
  && INQAttack.inqcharacter != undefined){
    INQAttack.PsyRating = INQAttack.inqcharacter.Attributes.PR;
  }
  //if the psy rating still has no set value, just default to 0
  if(INQAttack.PsyRating == undefined){
    INQAttack.PsyRating = 0;
  }
}
