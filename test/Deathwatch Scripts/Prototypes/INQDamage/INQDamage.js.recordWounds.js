var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQDamage.prototype.recordWounds()', function() {
	it('should edit the graphic\'s bar 3', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar3_value: '40'});
		new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.damage = 3;
      inqdamage.recordWounds(graphic);
      expect(graphic.get('bar3_value')).to.equal(37);
      done();
    });
  });
  it('should call the calcCrit method', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar3_value: '40'});
		new INQDamage(character, graphic, function(inqdamage) {
      inqdamage.damage = 41;
      on('chat:message', function(msg) {
        expect(msg.target).to.equal('gm');
        expect(msg.content).to.include(getLink(character));
        expect(msg.content).to.include(getLink(impactHead));
        expect(msg.content).to.include('(1)');
        done();
      });
      inqdamage.recordWounds(graphic);
      expect(graphic.get('bar3_value')).to.equal(-1);
      done();
    });
  });
  it('should call damageFx if damage is non-zero');
});
