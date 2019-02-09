INQCharacterSheet.prototype.deleteList = function(re, first_name) {
  const objs = this.getRepeating(re, first_name);
  objs.forEach((obj) => obj.remove());
}
