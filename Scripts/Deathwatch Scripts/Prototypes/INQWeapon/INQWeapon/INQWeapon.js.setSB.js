//functions that take input from the character wielding the weapon
INQWeapon.prototype.setSB = function(strBonus){
  //only add the strength bonus to melee weapons
  if(this.Class == "Melee"){
    this.DamageBase += strBonus;
    //fist weapons add the SB twice
    if(this.has("Fist")){
      this.DamageBase += strBonus;
    }
  }

  //replace every instance of SB with the strength bonus of the character
  var strStats = ["Range"];
  for(var i = 0; i < strStats.length; i++){
    //these should be strings, waiting to be transformed into integers
    if(typeof this[strStats[i]] == 'string'){
      //does this stat rely on the strength bonus?
      if(/SB/.test(this[strStats[i]])){
        //find the Strength Bonus coefficient
        var coefficient = 1;
        var matches = this[strStats[i]].match(/\d+/);
        if(matches){
          coefficient = Number(matches[0]);
        }
        //transform the string formula into an integer
        this[strStats[i]] = coefficient * strBonus;
      }
    }
  }
}
