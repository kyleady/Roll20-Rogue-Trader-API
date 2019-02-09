INQCharacterSheet.prototype.removeChildren = function() {
  this.deleteLists();

  const oldAbilities = findObjs({
    _characterid: this.characterid,
    _type: 'ability'
  });

  _.each(oldAbilities, ability => ability.remove());
}
