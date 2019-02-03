INQCharacterSheet.translateAttribute = function(old_name) {
  return INQCharacterSheet.listArmour()[old_name] ||
    INQCharacterSheet.listAttributes()[old_name] ||
    INQCharacterSheet.listCharacteristics()[old_name] ||
    INQCharacterSheet.listUnnatural()[old_name] ||
    old_name;
}
