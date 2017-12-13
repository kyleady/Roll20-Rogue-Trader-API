var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacter.prototype.calcHorde()', function() {
	it('should return the number of graphics that have the same horde label', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic3 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic4 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic5 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var inqcharacter = new INQCharacter();
    inqcharacter.GraphicID = graphic1.id;
    expect(inqcharacter.calcHorde()).to.equal(5);
  });
  it('should ignore graphics that are dead', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    graphic2.set('status_dead', true);
    var graphic3 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic4 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic5 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var inqcharacter = new INQCharacter();
    inqcharacter.GraphicID = graphic1.id;
    expect(inqcharacter.calcHorde()).to.equal(4);
  });
  it('should ignore graphics that do not share the same bar2_value', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'H2'});
    var graphic3 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic4 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic5 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var inqcharacter = new INQCharacter();
    inqcharacter.GraphicID = graphic1.id;
    expect(inqcharacter.calcHorde()).to.equal(4);
  });
  it('should ignore graphics that are not on the same page', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var page2 = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic2 = createObj('graphic', {_pageid: page2.id, bar2_value: 'H1'});
    var graphic3 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic4 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic5 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var inqcharacter = new INQCharacter();
    inqcharacter.GraphicID = graphic1.id;
    expect(inqcharacter.calcHorde()).to.equal(4);
  });
  it('should return 0 if bar2_value does not start with h', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: '1'});
    var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: '1'});
    var graphic3 = createObj('graphic', {_pageid: page.id, bar2_value: '1'});
    var graphic4 = createObj('graphic', {_pageid: page.id, bar2_value: '1'});
    var graphic5 = createObj('graphic', {_pageid: page.id, bar2_value: '1'});
    var inqcharacter = new INQCharacter();
    inqcharacter.GraphicID = graphic1.id;
    expect(inqcharacter.calcHorde()).to.equal(0);
  });
  it('should return 0 if the inqcharacter does not have a GraphicID', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic3 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic4 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var graphic5 = createObj('graphic', {_pageid: page.id, bar2_value: 'H1'});
    var inqcharacter = new INQCharacter();
    expect(inqcharacter.calcHorde()).to.equal(0);
  });
});
