var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTurns.prototype.addTurn()', function() {
	it('should add a turn to the turnorder property', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var inqturns = new INQTurns();
    expect(inqturns.turnorder).to.be.empty;

    inqturns.addTurn(graphic, 13);
    expect(inqturns.turnorder).to.deep.equal([{custom: '', id: graphic.id, pr: '13', _pageid: page.id}]);
  });
  it('should replace any turns with the same graphic id', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var inqturns = new INQTurns();
    expect(inqturns.turnorder).to.be.empty;

    inqturns.addTurn(graphic, 13);
    inqturns.addTurn(graphic, 8);
    expect(inqturns.turnorder).to.deep.equal([{custom: '', id: graphic.id, pr: '8', _pageid: page.id}]);
  });
  it('should add turns in initiative order', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var graphic2 = createObj('graphic', {_pageid: page.id});
    var graphic3 = createObj('graphic', {_pageid: page.id});
    var inqturns = new INQTurns();
    expect(inqturns.turnorder).to.be.empty;

    inqturns.addTurn(graphic, 8);
    inqturns.addTurn(graphic2, 17);
    inqturns.addTurn(graphic3, 13);

    expect(inqturns.turnorder).to.deep.equal([
      {custom: '', id: graphic2.id, pr: '17', _pageid: page.id},
      {custom: '', id: graphic3.id, pr: '13', _pageid: page.id},
      {custom: '', id: graphic.id, pr: '8', _pageid: page.id}
    ]);
  });
  it('should add turns in initiative order, even if the initiative has already started moving', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var graphic2 = createObj('graphic', {_pageid: page.id});
    var graphic3 = createObj('graphic', {_pageid: page.id});
    var graphic4 = createObj('graphic', {_pageid: page.id});
    var inqturns = new INQTurns();
    inqturns.turnorder = [
      {custom: '', id: graphic3.id, pr: '13', _pageid: page.id},
      {custom: '', id: graphic.id, pr: '8', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '17', _pageid: page.id}
    ];

    inqturns.addTurn(graphic4, 11);

    expect(inqturns.turnorder).to.deep.equal([
      {custom: '', id: graphic3.id, pr: '13', _pageid: page.id},
      {custom: '', id: graphic4.id, pr: '11', _pageid: page.id},
      {custom: '', id: graphic.id, pr: '8', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '17', _pageid: page.id}
    ]);
  });
  it('should add turns to the end if initiative order is not descending', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var graphic2 = createObj('graphic', {_pageid: page.id});
    var graphic3 = createObj('graphic', {_pageid: page.id});
    var graphic4 = createObj('graphic', {_pageid: page.id});
    var inqturns = new INQTurns();
    inqturns.turnorder = [
      {custom: '', id: graphic.id, pr: '8', _pageid: page.id},
      {custom: '', id: graphic3.id, pr: '13', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '17', _pageid: page.id}
    ];

    inqturns.addTurn(graphic4, 11);

    expect(inqturns.turnorder).to.deep.equal([
      {custom: '', id: graphic.id, pr: '8', _pageid: page.id},
      {custom: '', id: graphic3.id, pr: '13', _pageid: page.id},
      {custom: '', id: graphic2.id, pr: '17', _pageid: page.id},
      {custom: '', id: graphic4.id, pr: '11', _pageid: page.id}
    ]);
  });
});
