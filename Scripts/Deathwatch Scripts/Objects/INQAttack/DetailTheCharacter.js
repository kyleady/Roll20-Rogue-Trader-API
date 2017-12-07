//be sure the inqattack object exists before we start working with it
INQAttack_old = INQAttack_old || {};
INQAttack_old.detailTheCharacter = function(character, graphic, callback){
  INQAttack_old.inqcharacter = undefined;
  var myPromise = new Promise(function(resolve){
    if(character && characterType(character) != 'character' && !playerIsGM(INQAttack_old.msg.playerid)){
      var pilot = defaultCharacter(INQAttack_old.msg.playerid);
      if(pilot != undefined){
        INQAttack_old.inqcharacter = new INQCharacter(pilot, undefined, function(){
          INQAttack_old.inqcharacter.ObjID = character.id;
          INQAttack_old.inqcharacter.GraphicID = graphic.id;
          resolve();
        });
        return;
      }
    }
    resolve();
  });
  myPromise.catch(function(e){log(e)});
  myPromise.then(function(){
    if(INQAttack_old.inqcharacter == undefined){
      INQAttack_old.inqcharacter = new INQCharacter(character, graphic, function(){
        callback();
      });
    } else {
      callback();
    }
  });
}
