var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQParser.prototype.objectToText()', function() {
	it('should return itself in a callback', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
    var inqparser = new INQParser();
    inqparser.objectToText(character, function(itself){
      expect(itself).to.equal(inqparser);
      done();
    });
  });
  it('should save the text of the given object to Text', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var character = inqcharacter.toCharacterObj();
    var inqparser = new INQParser();
    expect(inqparser.Text).to.be.empty;
    inqparser.objectToText(character, function(){
      expect(inqparser.Text).to.not.be.empty;
      done();
    });
  });
  it('should concat the notes and gmnotes with <br>', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var character = createObj('character', {});
    character.set('bio', 'text1');
    character.set('gmnotes', 'text2');
    var inqparser = new INQParser();
    expect(inqparser.Text).to.be.empty;
    inqparser.objectToText(character, function(){
      expect(inqparser.Text).to.equal('text1<br>text2');
      done();
    });
  });
  it('should be able to convert characters', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var character = createObj('character', {});
    character.set('bio', 'text1');
    character.set('gmnotes', 'text2');
    var inqparser = new INQParser();
    expect(inqparser.Text).to.be.empty;
    inqparser.objectToText(character, function(){
      expect(inqparser.Text).to.equal('text1<br>text2');
      done();
    });
  });
  it('should be able to convert handouts', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {});
    handout.set('notes', 'htext1');
    handout.set('gmnotes', 'htext2');
    var inqparser = new INQParser();
    expect(inqparser.Text).to.be.empty;
    inqparser.objectToText(handout, function(){
      expect(inqparser.Text).to.equal('htext1<br>htext2');
      done();
    });
  });
  it('should ignore notes that are just the word null', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var handout = createObj('handout', {});
    handout.set('notes', 'null');
    handout.set('gmnotes', 'null');
    var inqparser = new INQParser();
    expect(inqparser.Text).to.be.empty;
    inqparser.objectToText(handout, function(){
      expect(inqparser.Text).to.equal('<br>');
      done();
    });
  });
});
