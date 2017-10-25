//be sure the inqattack object exists before we start working with it
INQAttack = INQAttack || {};
INQAttack.detailTheCharacter = function(character, graphic, callback){
  INQAttack.inqcharacter = undefined;
  var myPromise = new Promise(function(resolve){
    if(character && characterType(character) != 'character' && !playerIsGM(INQAttack.msg.playerid)){
      var pilot = defaultCharacter(INQAttack.msg.playerid);
      if(pilot != undefined){
        INQAttack.inqcharacter = new INQCharacter(pilot, undefined, function(){
          INQAttack.inqcharacter.ObjID = character.id;
          INQAttack.inqcharacter.GraphicID = graphic.id;
          resolve();
        });
        return;
      }
    }
    resolve();
  });
  myPromise.then(function(){
    if(INQAttack.inqcharacter == undefined){
      INQAttack.inqcharacter = new INQCharacter(character, graphic, function(){
        callback();
      });
    } else {
      callback();
    }
  });
}
