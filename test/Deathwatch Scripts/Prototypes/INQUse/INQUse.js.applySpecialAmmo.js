var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQUse.prototype.applySpecialAmmo()', function() {
	it('should concat the special rules onto the current INQWeapon', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {name: 'Weapon Handout', notes: '<strong>Dam</strong>: D10 R<br><strong>Pen</strong>: 4<br><strong>Special</strong>: Balanced'});
    var player = createObj('player', {_displayname: 'Player Name'}, {MOCK20override: true});
    var page = createObj('page', {}, {MOCK20override: true});
    var character = createObj('character', {});
    var graphic = createObj('graphic', {_pageid: page.id, represents: character.id});
    var options = {};
    new INQUse('Weapon Handout', options, character, graphic, player.id, function(inquse){
      inquse.inqammo = new INQWeapon('Snake Blood (Dam[+2], Toxic, Pen[+2])');
      inquse.applySpecialAmmo();
      expect(inquse.inqweapon.Special).to.deep.equal([new INQLink('Balanced'), new INQLink('Dam(+2)'), new INQLink('Toxic'), new INQLink('Pen(+2)')]);
      done();
    });
  });
});
