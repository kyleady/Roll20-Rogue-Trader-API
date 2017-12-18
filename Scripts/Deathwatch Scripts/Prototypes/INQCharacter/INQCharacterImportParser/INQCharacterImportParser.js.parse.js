INQCharacterImportParser.prototype.parse = function(text){
  var parser = new INQImportParser(this);
  parser.getList(/^\s*skills\s*$/i, ["List", "Skills"]);
  parser.getList(/^\s*talents\s*$/i, ["List", "Talents"]);
  parser.getList(/^\s*traits\s*$/i, ["List", "Traits"]);
  parser.getList(/^\s*gear\s*$/i, ["List", "Gear"]);
  parser.getList(/^\s*psychic\s+powers\s*$/i, ["List", "Psychic Powers"]);
  parser.getNumber(/^\s*move(ment)?\s*$/i, ["Movement", ["Half", "Full", "Charge", "Run"]]);
  parser.getNumber(/^\s*wounds\s*$/i, ["Attributes", "Wounds"]);
  parser.getNothing(/^\s*total\s+TB\s*$/i);
  parser.getWeapons(/^\s*weapons\s*$/i, ["List", "Weapons"]);
  parser.getArmour(/^\s*armour\s*$/i, ["Attributes", {
    Armour_H:  /\s*head\s*/i,
    Armour_RA: /\s*arms\s*/i,
    Armour_LA: /\s*arms\s*/i,
    Armour_B:  /\s*body\s*/i,
    Armour_RL: /\s*legs\s*/i,
    Armour_LL: /\s*legs\s*/i
  }]);
  var unlabeled = parser.parse(text);

  this.interpretUnlabeled(unlabeled);
  //do final adjustments
  this.adjustBonus();
  this.adjustWeapons();
  this.calcAttributes();
}
