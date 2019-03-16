INQWeapon.prototype.getSpecial = function(justText) {
  const textList = this.Special.map(rule => rule.toNote(justText).replace('(', '[').replace(')', ']'));
  return textList.join(', ');
}
