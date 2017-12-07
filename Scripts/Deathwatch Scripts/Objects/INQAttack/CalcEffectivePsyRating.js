INQAttack_old = INQAttack_old || {};
//determine the effective psy rating of the character
INQAttack_old.calcEffectivePsyRating = function(){
  //reset the psy rating for each selected character
  INQAttack_old.PsyRating = undefined;
  //allow the options to superceed the character's psy rating
  if(INQAttack_old.options.EffectivePR){
    INQAttack_old.PsyRating = Number(INQAttack_old.options.EffectivePR);
  }
  //if no effective psy rating is set, default to the character's psy rating
  if(INQAttack_old.PsyRating == undefined
  && INQAttack_old.inqcharacter != undefined){
    INQAttack_old.PsyRating = INQAttack_old.inqcharacter.Attributes.PR;
  }
  //if the psy rating still has no set value, just default to 0
  if(INQAttack_old.PsyRating == undefined){
    INQAttack_old.PsyRating = 0;
  }
}
