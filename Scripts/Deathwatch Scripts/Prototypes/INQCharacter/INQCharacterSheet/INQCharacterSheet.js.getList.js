INQCharacterSheet.prototype.getList = function(re, first_name) {
  const objs = this.getRepeating(re, first_name);
  const list_of_names = objs.map((obj) => new INQLink(obj.get('current')));
  return list_of_names;
}
