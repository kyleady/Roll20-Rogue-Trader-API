function useWeapon (matches, msg) {
  //clean out any of the previous details
  INQAttack.clean();
  //get the options
  INQAttack.options = carefulParse(matches[2]) || {};
  //save the weapon name
  INQAttack.weaponname = matches[1];
  //save the message for use elsewhere
  INQAttack.msg = msg;
  //if nothing was selected and the player is the gm, auto hit with no roll
  if(INQAttack.msg.selected == undefined || INQAttack.msg.selected == []){
    if(playerIsGM(INQAttack.msg.playerid)){
      INQAttack.msg.selected = [{_type: "unique"}];
    }
  }
  //repeat for each character selected
  eachCharacter(INQAttack.msg, function(character, graphic){
    //allow the loop to skip over future iterations if something went wrong
    if(INQAttack.break){return;}
    //reset the report
    INQAttack.Reports = {};
    //prepare attack variables for each character's attack
    INQAttack.prepareVariables();
    //detail the character (or make a dummy character)
    var characterPromise = new Promise(function(resolve){
      INQAttack.detailTheCharacter(character, graphic, function(){
        resolve();
      });
    });
    var weaponPromise = new Promise(function(resolve){
      INQAttack.detailTheWeapon(function(valid){
        resolve(valid);
      });
    });
    Promise.all([characterPromise, weaponPromise]).catch(function(e){log(e)});
    Promise.all([characterPromise, weaponPromise]).then(function(valid){
      if(valid.includes(false)) return;
      if(character != undefined){
        //roll to hit
        INQAttack.rollToHit();
        //use up the ammo for the attack
        //cancel this attack if there isn't enough ammo
        if(!INQAttack.expendAmmunition()){return;}
      }

      //check if the weapon jammed
      INQAttack.checkJammed();
      //only show the damage if the attack hit
      if(INQAttack.hits == 0){
        //offer reroll
        INQAttack.offerReroll();
      } else {
        //roll damage
        INQAttack.rollDamage();
      }
      //report the results
      INQAttack.deliverReport();
    });
  });
}

on("ready", function(){
  var regex = "^!\\s*use\\s*weapon";
  regex += "\\s+(\\S[^\\{\\}]*)"
  regex += "(\\{.*\\})$"
  var re = RegExp(regex, "i");
  CentralInput.addCMD(re, useWeapon, true);
});
