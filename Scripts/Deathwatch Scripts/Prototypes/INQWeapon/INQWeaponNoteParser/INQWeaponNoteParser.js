//takes the a weapon note from a character sheet and turns it into the INQWeapon Prototype
function INQWeaponNoteParser(){}

INQWeaponNoteParser.prototype = Object.create(INQWeapon.prototype);
INQWeaponNoteParser.prototype.constructor = INQWeaponNoteParser;
