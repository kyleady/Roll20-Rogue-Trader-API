//searches every message for rolls to hit and damage rolls.
state = state || {};
state.Successes = 0;
on("chat:message", function(msg) {
  //if a message matches one of two types of formats, the system records the
  //Damage, Damage Type, Penetration, Primitive, and Felling of the attack.
  //The roll to hit, and thus the number of hits, are expected to be in a
  //different message.

  //Format 1
  //A whisper to the gm
  //"/w gm [name] deals [[damage]] [damagetype] Damage, [[penetration]] Pen
  //[optional list of special rules separated by commas] with a(n) [weapon]"

  //Format 2
  //Similar to above, but in a public emote
  //"/em - [name] deals [[damage]] [damagetype] Damage, [[penetration]] Pen
  //[optional list of special rules separated by commas] with a/an [weapon]"

  //Format 3
  //This roll template can be whispered or publicly shown
  //Any roll template that has a title starting with ""<strong>Damage</strong>: "
  //and its first two inline rolls are Damage and Pen

  //At least two inline rolls are expected
  if( (((msg.type == "emote") || (msg.type == "whisper" && msg.target == "gm"))
  && /deals\s*\$\[\[0\]\]\s*(impact|explosive|rending|energy|.*>I<.*|.*>X<.*|.*>R<.*|.*>E<.*)\s*damage,\s*\$\[\[1\]\]\s*(pen|penetration).*with\s+a/i.test(msg.content)
  )
  || (/^\s*{{\s*name\s*=\s*(<strong>|\*\*)\s*damage\s*(<\/strong>|\*\*):.*}}/i.test(msg.content)
  && /{{\s*(damage|dam)\s*=\s*\$\[\[0\]\]\s*}}/i.test(msg.content)
  && /{{\s*(penetration|pen)\s*=\s*\$\[\[1\]\]\s*}}/i.test(msg.content))
  && msg.inlinerolls.length >= 2) {

    var details = damDetails();
    if(!details) return;
    var DamTypeObj = details.DamType;
    var DamObj = details.Dam;
    var PenObj = details.Pen;
    var FellObj = details.Fell;
    var PrimObj = details.Prim;
    var InaObj = details.Ina;
    var onesLocObj = details.OnesLoc;
    var tensLocObj = details.TensLoc;

    //I don't know why I need to do this BUT for some reason when the message is sent by the API
    //instead of a player, the inline rolls start with a null object, and accessing a null object is dangerous
    //"with a(n) " is the generic method I have the api using. Player sent commands are expected to be more intelligent
    var rollIndex = 0;
    while(!msg.inlinerolls[rollIndex]) rollIndex++;

    //record Damage Type
    var DamageType;
    if(msg.content.indexOf(" Energy ") !== -1 || msg.content.indexOf(">E<") !== -1){
      DamageType = "E";
    } else if(msg.content.indexOf(" Rending ") !== -1 || msg.content.indexOf(">R<") !== -1){
      DamageType = "R";
    } else if(msg.content.indexOf(" Explosive ") !== -1 || msg.content.indexOf(">X<") !== -1){
      DamageType = "X";
    } else {//if(msg.content.indexOf(" Impact ") !== -1){
      DamageType = "I";
    }
    DamTypeObj.set("current", DamageType);

    //record Damage
    DamObj.set('current', msg.inlinerolls[rollIndex].results.total);

    //record the highest damage roll
    var firstDie = 0;
    var lowestDie = 11;
    for(var roll of msg.inlinerolls[rollIndex].results.rolls) {
      if(!roll.results) continue;
      for(var result of roll.results){
        if(!result.d){
          if(!firstDie) firstDie = result.v;
          if(result.v < lowestDie) lowestDie = result.v;
        }
      }
    }

    //record Penetration
    PenObj.set('current', msg.inlinerolls[rollIndex + 1].results.total);

    FellObj.set('current', 0);
    InaObj.set('current', 0);
    var notesMatches = msg.content.match(/{{\s*Notes\s*=\s*([^}]*)}}/);
    if(notesMatches) {
      var notes = notesMatches[1];
      notes = notes.replace('(', '[').replace(')', ']') || 'D10 I';
      var inqweapon = new INQWeapon('Fake Weapon(' + notes + ')');
      var felling = inqweapon.has('Felling');
      var ina = inqweapon.has('Ignores Natural Armour');
      var inqqtt = new INQQtt({PR: 0, SB: 0});
      FellObj.set('current', inqqtt.getTotal(felling, 0));
      if(ina) InaObj.set('current', 1);
    }

    //record Primitive
    //if the weapon is Primitive and does not have the mono upgrade
    if(msg.content.indexOf("Primitive") != -1 && msg.content.indexOf("Mono") == -1) {
      //record Primitive
      PrimObj.set("current",1);
      //report to the gm that everything was found
      whisper("Dam: " + DamObj.get("current") + " " + DamTypeObj.get("current") + ", Pen: " +  PenObj.get("current") + ", Felling: " + FellObj.get("current") + ", Primitive");
    }  else {
      //record Primitive
      PrimObj.set("current",0);
      //report to the gm that everything was found
      whisper("Dam: " + DamObj.get("current") + " " + DamTypeObj.get("current") + ", Pen: " +  PenObj.get("current") + ", Felling: " + FellObj.get("current"));
    }

    //create a button to report the lowest damage roll
    var firstButton = "[" + firstDie + "]";
    firstButton += "(";
    var hitLocation = getHitLocation(tensLocObj.get("current"), onesLocObj.get("current"));
    firstButton += "!{URIFixed}" + encodeURIFixed("Crit? " + DamTypeObj.get("current") + ' ' + hitLocation);
    firstButton += ")";

    var replaceButton = '[' + lowestDie + ' -> ' + state.Successes + '](';
    var replaceCMD = 'dam += ' + Math.max(state.Successes - lowestDie, 0);
    replaceButton += '!{URIFixed}' + encodeURIFixed(replaceCMD);
    replaceButton += ')'
    //was this a private attack?
    if(msg.type == "whisper"){
      //report the highest roll privately
      whisper(firstButton, {speakingAs: 'First Die'});
    } else {
      //report the highest roll publicly
      announce(firstButton, {speakingAs: 'First Die'});
    }

    whisper(replaceButton, {speakingAs: 'Replace Die'});

    //save the damage variables to their maximums as well
    DamObj.set("max",DamObj.get("current"));
    DamTypeObj.set("max",DamTypeObj.get("current"));
    PenObj.set("max",PenObj.get("current"));
    FellObj.set("max",FellObj.get("current"));
    InaObj.set('max', InaObj.get('current'));
    PrimObj.set("max",PrimObj.get("current"));
  }
});
