var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQDamage.prototype.starshipDamage()', function() {
	it('should damage the ship\'s population and morale', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQStarship();
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar3_value: '40', bar2_value: '30', bar1_value: '20'});
		new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.damage = 3;
      inqdamage.starshipDamage(graphic);
      expect(graphic.get('bar2_value')).to.equal(27);
      expect(graphic.get('bar1_value')).to.equal(17);
      done();
    });
  });
  it('should account for population defense', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQStarship();
    inqcharacter.Attributes.Armour_Population = 1;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar3_value: '40', bar2_value: '30', bar1_value: '20'});
		new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.damage = 3;
      inqdamage.starshipDamage(graphic);
      expect(graphic.get('bar2_value')).to.equal(27);
      expect(graphic.get('bar1_value')).to.equal(18);
      done();
    });
  });
  it('should account for population defense', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQStarship();
    inqcharacter.Attributes.Armour_Morale = 1;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar3_value: '40', bar2_value: '30', bar1_value: '20'});
		new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.damage = 3;
      inqdamage.starshipDamage(graphic);
      expect(graphic.get('bar2_value')).to.equal(28);
      expect(graphic.get('bar1_value')).to.equal(17);
      done();
    });
  });
  it('should never increase morale or population', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQStarship();
    inqcharacter.Attributes.Armour_Morale = 100;
    inqcharacter.Attributes.Armour_Population = 100;
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar3_value: '40', bar2_value: '30', bar1_value: '20'});
		new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.damage = 1;
      inqdamage.starshipDamage(graphic);
      expect(graphic.get('bar2_value')).to.equal(30);
      expect(graphic.get('bar1_value')).to.equal(20);
      done();
    });
  });
  it('should never reduce morale or population below zero', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQStarship();
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar3_value: '40', bar2_value: '30', bar1_value: '20'});
		new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.damage = 100;
      inqdamage.starshipDamage(graphic);
      expect(graphic.get('bar2_value')).to.equal(0);
      expect(graphic.get('bar1_value')).to.equal(0);
      done();
    });
  });
});
