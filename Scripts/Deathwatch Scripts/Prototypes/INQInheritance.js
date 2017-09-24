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

  INQVehicleImportParser.prototype = Object.create(INQVehicle.prototype);
  INQVehicleImportParser.prototype.constructor = INQVehicleImportParser;

  INQVehicleParser.prototype = Object.create(INQVehicle.prototype);
  INQVehicleParser.prototype.constructor = INQVehicleParser;

  INQCharacterImportParser.prototype = Object.create(INQCharacter.prototype);
  INQCharacterImportParser.prototype.constructor = INQCharacterImportParser;

  INQCharacterParser.prototype = Object.create(INQCharacter.prototype);
  INQCharacterParser.prototype.constructor = INQCharacterParser;

  INQWeaponNoteParser.prototype = Object.create(INQWeapon.prototype);
  INQWeaponNoteParser.prototype.constructor = INQWeaponNoteParser;

  INQWeaponParser.prototype = Object.create(INQWeapon.prototype);
  INQWeaponParser.prototype.constructor = INQWeaponParser;

  INQLinkParser.prototype = new INQLink();
  INQLinkParser.prototype.constructor = INQLinkParser;
});
