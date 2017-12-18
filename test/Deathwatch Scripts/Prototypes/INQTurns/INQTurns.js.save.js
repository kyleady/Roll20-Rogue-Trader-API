var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTurns.prototype.save()', function() {
	it('should stringify and save the turnorder to the Campaign()', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var graphic2 = createObj('graphic', {_pageid: page.id});
    var inqturns = new INQTurns();
    expect(inqturns.turnorder).to.be.empty;

    inqturns.addTurn(graphic, 13);
    inqturns.addTurn(graphic2, 19);

    expect(Campaign().get('turnorder')).to.equal('');
    inqturns.save();
    expect(Campaign().get('turnorder')).to.equal(JSON.stringify(inqturns.turnorder));
  });
});
