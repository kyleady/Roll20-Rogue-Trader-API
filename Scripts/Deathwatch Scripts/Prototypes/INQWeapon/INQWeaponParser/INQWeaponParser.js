//takes the handout object of a weapon and turns it into the INQWeapon Prototype
function INQWeaponParser(){}

INQWeaponParser.prototype = Object.create(INQWeapon.prototype);
INQWeaponParser.prototype.constructor = INQWeaponParser;
