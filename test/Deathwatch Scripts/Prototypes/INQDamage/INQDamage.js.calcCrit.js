var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQDamage.prototype.calcCrit()', function() {
	it('should whisper the critical effect to the gm', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 14;
    var character = inqcharacter.toCharacterObj();
    var impactHead = createObj('handout', {name: 'Impact Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(impactHead));
        expect(msg.content).to.include('(1)');
        done();
      });

      inqdamage.calcCrit(-1);
    });
  });
  it('should do nothing if the remaining Wounds >= 0', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 14;
    var character = inqcharacter.toCharacterObj();
    var impactHead = createObj('handout', {name: 'Impact Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        throw true;
      });

      setTimeout(done, 200);
      inqdamage.calcCrit(0);
    });
  });
  it('should use Damage Type to determine the Crit Handout for Characters', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 14;
    var character = inqcharacter.toCharacterObj();
    var explosiveHead = createObj('handout', {name: 'Explosive Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(explosiveHead));
        expect(msg.content).to.include('(1)');
        done();
      });

      inqdamage.DamType.set('current', 'X');
      inqdamage.calcCrit(-1);
    });
  });
  it('should use the hit location to determine the Crit Handout for Characters', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 14;
    var character = inqcharacter.toCharacterObj();
    var energyBody = createObj('handout', {name: 'Energy Critical Effects - Body'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(energyBody));
        expect(msg.content).to.include('(1)');
        done();
      });

      inqdamage.DamType.set('current', 'E');
      inqdamage.OnesLoc.set('current', '7');
      inqdamage.TensLoc.set('current', '3');
      inqdamage.calcCrit(-1);
    });
  });
  it('should divide the critical effects by the Character\'s wounds bonus', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 54;
    inqcharacter.Attributes['Unnatural Wounds'] = 1;
    var character = inqcharacter.toCharacterObj();
    var energyBody = createObj('handout', {name: 'Energy Critical Effects - Body'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(energyBody));
        expect(msg.content).to.include('(2)');
        done();
      });

      inqdamage.DamType.set('current', 'E');
      inqdamage.OnesLoc.set('current', '7');
      inqdamage.TensLoc.set('current', '3');
      inqdamage.calcCrit(-12);
    });
  });
	it('should round up to determine the critical effect', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 54;
    inqcharacter.Attributes['Unnatural Wounds'] = 1;
    var character = inqcharacter.toCharacterObj();
    var rendingLeg = createObj('handout', {name: 'Rending Critical Effects - Leg'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(rendingLeg));
        expect(msg.content).to.include('(3)');
        done();
      });

      inqdamage.DamType.set('current', 'R');
      inqdamage.OnesLoc.set('current', '1');
      inqdamage.TensLoc.set('current', '3');
      inqdamage.calcCrit(-13);
    });
  });
  it('should treat the Wounds Bonus as at least 1, to avoid dividing by 0', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 0;
    inqcharacter.Attributes['Unnatural Wounds'] = 0;
    var character = inqcharacter.toCharacterObj();
    var energyBody = createObj('handout', {name: 'Energy Critical Effects - Body'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(energyBody));
        expect(msg.content).to.include('(12)');
        done();
      });

      inqdamage.DamType.set('current', 'E');
      inqdamage.OnesLoc.set('current', '7');
      inqdamage.TensLoc.set('current', '3');
      inqdamage.calcCrit(-12);
    });
  });
	it('should use the hit location to determine the critical effect handout for vehicles', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQVehicle();
    inqcharacter.Name = 'Crit Vehicle';
    var character = inqcharacter.toCharacterObj();
    var weaponCrit = createObj('handout', {name: 'Weapon Critical Effects'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(weaponCrit));
        expect(msg.content).to.include('(12)');
        done();
      });

      inqdamage.OnesLoc.set('current', '7');
      inqdamage.TensLoc.set('current', '3');
      inqdamage.calcCrit(-12);
    });
  });
	it('should divide the critical effect by the vehicle\'s structural integrity bonus', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQVehicle();
		inqcharacter.Attributes['Structural Integrity'] = 30;
		inqcharacter.Attributes['Unnatural Structural Integrity'] = 2;
    inqcharacter.Name = 'Crit Vehicle';
    var character = inqcharacter.toCharacterObj();
    var motiveCrit = createObj('handout', {name: 'Motive Systems Critical Effects'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(motiveCrit));
        expect(msg.content).to.include('(3)');
        done();
      });

      inqdamage.OnesLoc.set('current', '1');
      inqdamage.TensLoc.set('current', '3');
      inqdamage.calcCrit(-15);
    });
  });
	it('should not divide the critical effect by the starship\'s hull bonus', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQStarship();
		inqcharacter.Attributes['Hull'] = 30;
		inqcharacter.Attributes['Unnatural Hull'] = 2;
    inqcharacter.Name = 'Crit Starship';
    var character = inqcharacter.toCharacterObj();
    var starshipCrit = createObj('handout', {name: 'Starship Critical Effects'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(starshipCrit));
        expect(msg.content).to.include('(2)');
        done();
      });

      inqdamage.OnesLoc.set('current', '1');
      inqdamage.TensLoc.set('current', '3');
      inqdamage.calcCrit(-2);
    });
  });
	it('should should return 0 if it is a starship', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQStarship();
		inqcharacter.Attributes['Hull'] = 30;
		inqcharacter.Attributes['Unnatural Hull'] = 2;
    inqcharacter.Name = 'Crit Starship';
    var character = inqcharacter.toCharacterObj();
    var starshipCrit = createObj('handout', {name: 'Starship Critical Effects'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(starshipCrit));
        expect(msg.content).to.include('(2)');
        done();
      });

      inqdamage.OnesLoc.set('current', '1');
      inqdamage.TensLoc.set('current', '3');
      expect(inqdamage.calcCrit(-2)).to.equal(0);
    });
  });
	it('should return remainingWounds if it is a Vehicle', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQVehicle();
		inqcharacter.Attributes['Structural Integrity'] = 30;
		inqcharacter.Attributes['Unnatural Structural Integrity'] = 2;
    inqcharacter.Name = 'Crit Vehicle';
    var character = inqcharacter.toCharacterObj();
    var motiveCrit = createObj('handout', {name: 'Motive Systems Critical Effects'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(motiveCrit));
        expect(msg.content).to.include('(3)');
        done();
      });

      inqdamage.OnesLoc.set('current', '1');
      inqdamage.TensLoc.set('current', '3');
      expect(inqdamage.calcCrit(-15)).to.equal(-15);
    });
  });
	it('should return remainingWounds if it is a character', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 0;
    inqcharacter.Attributes['Unnatural Wounds'] = 0;
    var character = inqcharacter.toCharacterObj();
    var energyBody = createObj('handout', {name: 'Energy Critical Effects - Body'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage) {
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(energyBody));
        expect(msg.content).to.include('(12)');
        done();
      });

      inqdamage.DamType.set('current', 'E');
      inqdamage.OnesLoc.set('current', '7');
      inqdamage.TensLoc.set('current', '3');
      expect(inqdamage.calcCrit(-12)).to.equal(-12);
    });
  });
});
