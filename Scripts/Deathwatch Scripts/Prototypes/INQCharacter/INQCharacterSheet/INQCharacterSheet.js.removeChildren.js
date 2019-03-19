INQCharacterSheet.prototype.removeChildren = function() {
  this.deleteLists();
  const characterSheetAbilities = filterObjs((obj) => {
    if(obj.get('_type') != 'ability') return false;
    if(obj.get('_characterid') != this.characterid) return false;
    if(obj.get('action').startsWith('%')) return true;
    return false;
  });
  characterSheetAbilities.forEach(ability => ability.remove());
  /*
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
  */
}
