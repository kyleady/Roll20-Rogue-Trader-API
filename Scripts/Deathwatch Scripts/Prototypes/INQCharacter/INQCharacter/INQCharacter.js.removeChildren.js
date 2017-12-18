INQCharacter.prototype.removeChildren = function(characterid){
  var oldAttributes = findObjs({
    _characterid: characterid,
    _type: 'attribute'
  });
  _.each(oldAttributes, function(attr){
    attr.remove();
  });
  var oldAbilities = findObjs({
    _characterid: characterid,
    _type: 'ability'
  });
  _.each(oldAbilities, function(ability){
    ability.remove();
  });
}
