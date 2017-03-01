//be sure the inherited objects are ready
on("ready",function(){
  //INQCharacter, INQWeapon, and INQLink inherit from INQObject
  INQCharacter.prototype = new INQObject();
  INQCharacter.prototype.constructor = INQCharacter;

  INQVehicle.prototype = new INQObject();
  INQVehicle.prototype.constructor = INQVehicle;

  INQStarship.prototype = new INQObject();
  INQStarship.prototype.constructor = INQStarship;

  INQWeapon.prototype = new INQObject();
  INQWeapon.prototype.constructor = INQWeapon;

  INQLink.prototype = new INQObject();
  INQLink.prototype.constructor = INQLink;

  //the parser prototypes inherit from their respective INQ prototypes
  INQWeaponParser.prototype = new INQWeapon();
  INQWeaponParser.prototype.constructor = INQWeaponParser;

  INQWeaponParser.prototype = new INQLink();
  INQWeaponParser.prototype.constructor = INQLinkParser;
});
