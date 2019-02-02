INQCharacterSheet.translateAttribute = (old_name) => {
  return INQCharacterSheet.armour()[old_name] ||
    INQCharacterSheet.attributes()[old_name] ||
    INQCharacterSheet.characteristics()[old_name] ||
    INQCharacterSheet.unnatural()[old_name] ||
    old_name;
}
