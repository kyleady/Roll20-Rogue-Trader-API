//If the message was a roll to hit, record the number of Hits. The roll to hit
//must be a roll template and that roll template must have the following

//A title begining with "<strong>WS</strong>: ", "<strong>BS</strong>: ", or
//"<strong>Wp</strong>: ".
//The first inline roll must be the number of successes
//The second inline roll must be the number of unnatural successes
//There must be exactly two inline rolls
on("chat:message", function(msg){
  if(/^\s*{{\s*name\s*=\s*(<strong>|\*\*)\s*(WS|BS|Wp)\s*(<\/strong>|\*\*):.*}}/i.test(msg.content)
  && /{{\s*successes\s*=\s*\$\[\[0\]\]\s*}}/i.test(msg.content)
  && /{{\s*unnatural\s*=\s*\$\[\[1\]\]\s*}}/i.test(msg.content)
  && msg.inlinerolls.length == 2) {
    if(!msg.inlinerolls[0].results) return;
    //load up the AmmoTracker object to calculate the hit location
    saveHitLocation(msg.inlinerolls[0].results.rolls[1].results[0].v, {whisper: true});
    //if the number of successes was positive, add in Unnatural and save it
    if(msg.inlinerolls[0].results.total > 0){
      //the negative modifier keeps the total number of hits <= -1 while still
      //storing the number of hits, this is because all hits are assumed to be
      //Single Shot mode, but later commands such as (!Full and !Semi) will
      //convert these negative numbers into a positive number of hits.
      attributeValue('Hits', {setTo: (-1)*(1 + Math.floor(msg.inlinerolls[0].results.total) + Math.floor(msg.inlinerolls[1].results.total))});
      state.Successes = Math.floor(msg.inlinerolls[0].results.total) + Math.floor(msg.inlinerolls[1].results.total);
    //otherwise record that there were no hits
    } else {
      attributeValue('Hits', {setTo: 0});
      state.Successes = 0;
    }
    //check for perils of the warp
    if(/^\s*{{\s*name\s*=\s*<strong>\s*Wp\s*<\/strong>:.*}}/i.test(msg.content)){
      //was the one's place a 9?
      if((msg.inlinerolls[0].results.rolls[1].results[0].v - 10*Math.floor(msg.inlinerolls[0].results.rolls[1].results[0].v/10)) == 9){
        announce("/em makes an unexpected twist. (" + getLink("Psychic Phenomena") + ")", {speakingAs: "The warp"});
      }
    } else if(/^\s*{{\s*name\s*=\s*<strong>\s*BS\s*<\/strong>:.*}}/i.test(msg.content)){
      //was the roll >= 96?
      if(msg.inlinerolls[0].results.rolls[1].results[0].v >= 96){
        //warn the gm that the weapon jammed
        announce("/em " + getLink("Jam") + "s!" , {speakingAs: "The weapon"});
      //Full Auto and Semi Auto attacks jam on a 94+. Warn the gm just in case
      //this is one of them.
      } else if(msg.inlinerolls[0].results.rolls[1].results[0].v >= 94){
        //warn the gm that the weapon may have jammed
        announce("/em " + getLink("Jam") + "s!", {speakingAs: "The Full/Semi Auto weapon"});
      } else if(msg.inlinerolls[0].results.rolls[1].results[0].v >= 91){
        //warn the gm that the weapon may have jammed
        announce("/em " + getLink("Overheats") + "!", {speakingAs: "The weapon"});
      }
    }
  }
});
