//Watches for starship attack damage. It records the damage and penetration
//of the starship attack. The message must have the form of a roll template.
//The title must start with "<strong>Damage<strong>:"
//The first entry must be Damage with an inline roll
//The second entry must be the type of weapon used: Macro, Lance, Torpedo,Nova, Bomber
on("chat:message", function(msg) {
  if(/^\s*{{\s*name\s*=\s*(<strong>|\*\*)\s*damage\s*(<\/strong>|\*\*):.*}}\s*{{\s*(damage|dam)\s*=\s*\$\[\[0\]\]\s*}}\s*{{\s*type\s*=\s*(macro|nova|torpedo|lance|bomber)\s*}}/i.test(msg.content)
  && msg.inlinerolls.length >= 1) {
    //I don't know why I need to do this BUT for some reason when the message is sent by the API
    //instead of a player, the inline rolls start with a null object, and accessing a null object is dangerous
    //"with a(n) " is the generic method I have the api using. Player sent commands are expected to be more intelligent
    var rollIndex = 0;
    if(msg.inlinerolls[rollIndex] == undefined){
        rollIndex++;
    }
    //get the damage details obj
    var details = damDetails();
    //quit if one of the details was not found
    if(details == undefined){
      return;
    }
    var DamTypeObj = details.DamType;
    var DamObj = details.Dam;
    var PenObj = details.Pen;
    var FellObj = details.Fell;
    var PrimObj = details.Prim;

    //prepare to numically modifify the old damage
    starshipDamage = Number(DamObj.get("current"));

    //was the last attack a starship attack?
    if(DamTypeObj.get('current') != "S"){
        //we are now making this starship damage
        DamTypeObj.set('current', "S");
        //the new damage is just saved without regard for any of the old damage
        starshipDamage = msg.inlinerolls[rollIndex].results.total;
    } else {
        //add the new damage to the old damage
        starshipDamage += msg.inlinerolls[rollIndex].results.total;
    }

    //record the total Damage
    DamObj.set('current', starshipDamage);

    //record Penetration
    //is the weapon a lance or a nova weapon?
    if(msg.content.toLowerCase().indexOf("lance") != -1 || msg.content.toLowerCase().indexOf("nova") != -1){
      PenObj.set('current', 1);
      whisper("Dam: " + DamObj.get("current") + ", Pen: true");
    } else {
      PenObj.set('current', 0);
      whisper("Dam: " + DamObj.get("current") + ", Pen: false");
    }

    //record the attack to max as well
    DamObj.set('max',DamObj.get("current"));
    DamTypeObj.set('max',DamTypeObj.get("current"));
    PenObj.set('max',PenObj.get("current"));
  }
});
