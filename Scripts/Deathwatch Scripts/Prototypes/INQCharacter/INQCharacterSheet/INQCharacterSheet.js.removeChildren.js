INQCharacterSheet.prototype.removeChildren = function() {
  //this.deleteLists();
  const oldAttributes = findObjs({
    _characterid: this.characterid,
    _type: 'attribute'
  });
  const oldAbilities = findObjs({
    _characterid: this.characterid,
    _type: 'ability'
  });

  _.each(oldAttributes, attribute => attribute.remove());
  _.each(oldAbilities, ability => ability.remove());
}
