var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('insertWeaponAbility()', function() {
	it('should add a !useWeapon ability to the given character', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var inqweapon  = new INQWeapon();
		var inqcharacter = new INQCharacter();
		var character = inqcharacter.toCharacterObj();
		var quantity = undefined;
		var ammoNames = undefined;

		on('add:ability', function(obj){
			expect(obj.get('action')).to.match(/^!\s*use\s*Weapon\s*/i);
			done();
		});

		insertWeaponAbility(inqweapon, character, quantity, ammoNames, inqcharacter);
  });
	it('should keep weapon names unique, if there is a clip to keep track of', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var inqweapon  = new INQWeapon();
		inqweapon.Clip = 10;
		var inqcharacter = new INQCharacter();
		var character = inqcharacter.toCharacterObj();
		var quantity = undefined;
		var ammoNames = undefined;

		var match0 = false;
		var match2 = false;
		var match3 = false;

		on('add:ability', function(obj){
			if(obj.get('name') == 'Unique Weapon Name') match0 = true;
			if(obj.get('name') == 'Unique Weapon Name 2') match2 = true;
			if(obj.get('name') == 'Unique Weapon Name 3') match3 = true;

			if(match0 && match2 && match3) done();
		});

		inqweapon.Name = 'Unique Weapon Name';
		insertWeaponAbility(inqweapon, character, quantity, ammoNames, inqcharacter);
		inqweapon.Name = 'Unique Weapon Name';
		insertWeaponAbility(inqweapon, character, quantity, ammoNames, inqcharacter);
		inqweapon.Name = 'Unique Weapon Name';
		insertWeaponAbility(inqweapon, character, quantity, ammoNames, inqcharacter);
	});
	it('should only add the ability once, if there is no clip to keep track of', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var inqweapon  = new INQWeapon();
		var inqcharacter = new INQCharacter();
		var character = inqcharacter.toCharacterObj();
		var quantity = undefined;
		var ammoNames = undefined;

		var match0 = 0;
		var match2 = 0;
		var match3 = 0;

		on('add:ability', function(obj){
			if(obj.get('name') == 'Unique Weapon Name') match0++;
			if(obj.get('name') == 'Unique Weapon Name 2') match2++;
			if(obj.get('name') == 'Unique Weapon Name 3') match3++;
		});

		inqweapon.Name = 'Unique Weapon Name';
		insertWeaponAbility(inqweapon, character, quantity, ammoNames, inqcharacter);
		inqweapon.Name = 'Unique Weapon Name';
		insertWeaponAbility(inqweapon, character, quantity, ammoNames, inqcharacter);
		inqweapon.Name = 'Unique Weapon Name';
		insertWeaponAbility(inqweapon, character, quantity, ammoNames, inqcharacter);
		expect(match0).to.equal(1);
		expect(match2).to.equal(0);
		expect(match3).to.equal(0);
	});
	it('should keep weapon names unique, if there is a quantity to keep track of', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

		var inqweapon  = new INQWeapon();
		var inqcharacter = new INQCharacter();
		var character = inqcharacter.toCharacterObj();
		var quantity = 3;
		var ammoNames = undefined;

		var match0 = false;
		var match2 = false;
		var match3 = false;

		on('add:ability', function(obj){
			if(obj.get('name') == 'Unique Weapon Name') match0 = true;
			if(obj.get('name') == 'Unique Weapon Name 2') match2 = true;
			if(obj.get('name') == 'Unique Weapon Name 3') match3 = true;

			if(match0 && match2 && match3) done();
		});

		inqweapon.Name = 'Unique Weapon Name';
		insertWeaponAbility(inqweapon, character, quantity, ammoNames, inqcharacter);
		inqweapon.Name = 'Unique Weapon Name';
		insertWeaponAbility(inqweapon, character, quantity, ammoNames, inqcharacter);
		inqweapon.Name = 'Unique Weapon Name';
		insertWeaponAbility(inqweapon, character, quantity, ammoNames, inqcharacter);
	});
});
