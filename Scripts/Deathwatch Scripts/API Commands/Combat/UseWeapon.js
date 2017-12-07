function useWeapon (matches, msg) {
  //clean out any of the previous details
  INQAttack_old.clean();
  //get the options
  INQAttack_old.options = carefulParse(matches[2]) || {};
  //save the weapon name
  INQAttack_old.weaponname = matches[1];
  //save the message for use elsewhere
  INQAttack_old.msg = msg;
  //if nothing was selected and the player is the gm, auto hit with no roll
  if(INQAttack_old.msg.selected == undefined || INQAttack_old.msg.selected == []){
    if(playerIsGM(INQAttack_old.msg.playerid)){
      INQAttack_old.msg.selected = [{_type: "unique"}];
    }
  }
  //repeat for each character selected
  eachCharacter(INQAttack_old.msg, function(character, graphic){
    //allow the loop to skip over future iterations if something went wrong
    if(INQAttack_old.break){return;}
    //reset the report
    INQAttack_old.Reports = {};
    //prepare attack variables for each character's attack
    INQAttack_old.prepareVariables();
    //detail the character (or make a dummy character)
    var characterPromise = new Promise(function(resolve){
      INQAttack_old.detailTheCharacter(character, graphic, function(){
        resolve();
      });
    });
    var weaponPromise = new Promise(function(resolve){
      INQAttack_old.detailTheWeapon(function(valid){
        resolve(valid);
      });
    });
    Promise.all([characterPromise, weaponPromise]).catch(function(e){log(e)});
    Promise.all([characterPromise, weaponPromise]).then(function(valid){
      if(valid.includes(false)) return;
      if(character != undefined){
        //roll to hit
        INQAttack_old.rollToHit();
        //use up the ammo for the attack
        //cancel this attack if there isn't enough ammo
        if(!INQAttack_old.expendAmmunition()){return;}
      }

      //check if the weapon jammed
      INQAttack_old.checkJammed();
      //only show the damage if the attack hit
      if(INQAttack_old.hits == 0){
        //offer reroll
        INQAttack_old.offerReroll();
      } else {
        //roll damage
        INQAttack_old.rollDamage();
      }
      //report the results
      INQAttack_old.deliverReport();
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
