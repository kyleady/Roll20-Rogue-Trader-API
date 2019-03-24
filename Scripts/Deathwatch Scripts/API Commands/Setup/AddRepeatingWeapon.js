on('ready', () => {
  CentralInput.addCMD(/^!\s*add\s*ranged\s*button\s+(.+)$/i, (matches, msg) => {
    addRepeatingButton(matches, msg,
      '!add ranged button $',
      'repeating_rangedweapons_$$_Rangedweaponname',
      'repeating_rangedweapons_$$_Rangedhit'
    )
  });

  CentralInput.addCMD(/^!\s*add\s*melee\s*button\s+(.+)$/i, (matches, msg) => {
    addRepeatingButton(matches, msg,
      '!add melee button $',
      'repeating_meleeweapons_$$_meleeweaponname',
      'repeating_meleeweapons_$$_meleehit'
    )
  });
});
