INQCharacterSheet.prototype.getRepeating = function(re, first_name) {
  return filterObjs((obj) => {
    if(obj.get('_type') != 'attribute') return false;
    if(obj.get('_characterid') != this.characterid) return false;
    if(obj.get('name') == first_name) return true;
    return re.test(obj.get('name'));
  });
}
