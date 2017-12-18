var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQDamage()', function() {
	it('should create objects', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    expect(new INQDamage()).to.be.an.instanceof(INQDamage);
  });
  it('should run a callback when the object is finished initializing', function(done){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    new INQDamage(undefined, undefined, function(){
      done();
    });
  });
  it('should input the inqdamage object as an argument for the callback', function(done){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    new INQDamage(undefined, undefined, function(inqdamage){
      expect(inqdamage).to.an.instanceof(INQDamage);
      done();
    });
  });
  it('should accept a roll20 character and graphic', function(done){
    Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id})
    new INQDamage(character, graphic, function(inqdamage){
      expect(inqdamage.inqcharacter.ObjID).to.equal(character.id);
      expect(inqdamage.inqcharacter.GraphicID).to.equal(graphic.id);
      done();
    });
  });
});
