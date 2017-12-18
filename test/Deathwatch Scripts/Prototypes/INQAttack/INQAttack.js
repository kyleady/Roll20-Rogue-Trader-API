var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQAttack()', function() {
	it('should create objects', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var options = {custom: 'My Weapon(Pistol; D10+2; Pen 3; Spray)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqattack = new INQAttack(inquse);
      expect(inqattack).to.be.an.instanceof(INQAttack);
      done();
    });
  });
  it('should save the given pointer in the inquse property', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var options = {custom: 'My Weapon(Pistol; D10+2; Pen 3; Spray)'};
    new INQUse('weapon will be detailed in options.custom', options, undefined, undefined, player.id, function(inquse){
      var inqattack = new INQAttack(inquse);
      expect(inqattack.inquse).to.equal(inquse);
      expect(inqattack.inquse).to.be.an.instanceof(INQUse);
      done();
    });
  });
});
