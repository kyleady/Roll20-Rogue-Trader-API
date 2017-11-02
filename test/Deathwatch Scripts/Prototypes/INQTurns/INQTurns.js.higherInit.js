var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQTurns.prototype.higherInit()', function() {
	it('should true if turn1 has higher pr than turn2', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var inqcharacter1 = new INQCharacter();
    var inqcharacter2 = new INQCharacter();
    var character1 = inqcharacter1.toCharacterObj();
    var character2 = inqcharacter2.toCharacterObj();
    var graphic1 = createObj('graphic', {_pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, represents: character2.id});
    var inqturns = new INQTurns();
    var turn1 = inqturns.toTurnObj(graphic1, 12);
    var turn2 = inqturns.toTurnObj(graphic2, 9);
    expect(inqturns.higherInit(turn1, turn2)).to.equal(true);
  });
  it('should false if turn1 has lower pr than turn2', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var inqcharacter1 = new INQCharacter();
    var inqcharacter2 = new INQCharacter();
    var character1 = inqcharacter1.toCharacterObj();
    var character2 = inqcharacter2.toCharacterObj();
    var graphic1 = createObj('graphic', {_pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, represents: character2.id});
    var inqturns = new INQTurns();
    var turn1 = inqturns.toTurnObj(graphic1, 12);
    var turn2 = inqturns.toTurnObj(graphic2, 19);
    expect(inqturns.higherInit(turn1, turn2)).to.equal(false);
  });
  it('should true if turn1 has the same pr as turn2, but turn1 has a greater Ag than turn2', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var inqcharacter1 = new INQCharacter();
    var inqcharacter2 = new INQCharacter();
    inqcharacter1.Attributes.Ag = 25;
    inqcharacter2.Attributes.Ag = 20;
    var character1 = inqcharacter1.toCharacterObj();
    var character2 = inqcharacter2.toCharacterObj();
    var graphic1 = createObj('graphic', {_pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, represents: character2.id});
    var inqturns = new INQTurns();
    var turn1 = inqturns.toTurnObj(graphic1, 12);
    var turn2 = inqturns.toTurnObj(graphic2, 12);
    expect(inqturns.higherInit(turn1, turn2)).to.equal(true);
  });
  it('should false if turn1 has the same pr as turn2, but turn1 has less Ag than turn2', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var inqcharacter1 = new INQCharacter();
    var inqcharacter2 = new INQCharacter();
    inqcharacter1.Attributes.Ag = 25;
    inqcharacter2.Attributes.Ag = 27;
    var character1 = inqcharacter1.toCharacterObj();
    var character2 = inqcharacter2.toCharacterObj();
    var graphic1 = createObj('graphic', {_pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, represents: character2.id});
    var inqturns = new INQTurns();
    var turn1 = inqturns.toTurnObj(graphic1, 12);
    var turn2 = inqturns.toTurnObj(graphic2, 12);
    expect(inqturns.higherInit(turn1, turn2)).to.equal(false);
  });
  it('should randomize between true and false if turn1 and turn2 have the same initiative and Ag', function(){

    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var inqcharacter1 = new INQCharacter();
    var inqcharacter2 = new INQCharacter();
    inqcharacter1.Attributes.Ag = 25;
    inqcharacter2.Attributes.Ag = 25;
    var character1 = inqcharacter1.toCharacterObj();
    var character2 = inqcharacter2.toCharacterObj();
    var graphic1 = createObj('graphic', {_pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, represents: character2.id});
    var inqturns = new INQTurns();
    var turn1 = inqturns.toTurnObj(graphic1, 12);
    var turn2 = inqturns.toTurnObj(graphic2, 12);

    this.retries(10);
    var trueCount = 0;
    var falseCount = 0;
    for(var i = 0; i < 10; i++){
      if(inqturns.higherInit(turn1, turn2)){
        trueCount++;
      } else {
        falseCount++;
      }
    }
    expect(trueCount).to.not.equal(0);
    expect(falseCount).to.not.equal(0);
  });
  it('should attempt to use Detection if Ag is not found', function(){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var page = createObj('page', {}, {MOCK20override: true});
    var inqcharacter1 = new INQStarship();
    var inqcharacter2 = new INQStarship();
    inqcharacter1.Attributes.Detection = 37;
    inqcharacter2.Attributes.Detection = 32;
    var character1 = inqcharacter1.toCharacterObj();
    var character2 = inqcharacter2.toCharacterObj();
    var graphic1 = createObj('graphic', {_pageid: page.id, represents: character1.id});
    var graphic2 = createObj('graphic', {_pageid: page.id, represents: character2.id});
    var inqturns = new INQTurns();
    var turn1 = inqturns.toTurnObj(graphic1, 12);
    var turn2 = inqturns.toTurnObj(graphic2, 12);
    expect(inqturns.higherInit(turn1, turn2)).to.equal(true);
    expect(inqturns.higherInit(turn2, turn1)).to.equal(false);
  });
});
