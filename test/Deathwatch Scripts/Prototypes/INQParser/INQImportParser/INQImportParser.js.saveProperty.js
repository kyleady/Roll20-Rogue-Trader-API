var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQImportParser.prototype.saveProperty()', function() {
  it('should save the given value to the given location', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var parser = new INQImportParser(inqcharacter);
    expect(inqcharacter.Name).to.not.equal('INQ Name');
    parser.saveProperty('INQ Name', 'Name');
    expect(inqcharacter.Name).to.equal('INQ Name');
  });
  it('should allow for the location to be an array', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var parser = new INQImportParser(inqcharacter);
    expect(inqcharacter.Attributes.Wounds).to.not.equal('25');
    parser.saveProperty('25', ['Attributes', 'Wounds']);
    expect(inqcharacter.Attributes.Wounds).to.equal('25');
  });
  it('should save an array of values to an array of locations', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var parser = new INQImportParser(inqcharacter);
    expect(inqcharacter.Movement).to.not.deep.equal({Half: '1', Full: '2', Charge: '3', Run: '6'});
    parser.saveProperty(['1', '2', '3', '6'], ['Movement', ['Half', 'Full', 'Charge', 'Run']]);
    expect(inqcharacter.Movement).to.deep.equal({Half: '1', Full: '2', Charge: '3', Run: '6'});
  });
  it('should ignore any excess properties in an array', function(){
    Campaign().MOCK20reset();
    var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
    var MyScript = fs.readFileSync(filePath, 'utf8');
    eval(MyScript);
    MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Test1 = {};
    inqcharacter.Test2 = {};
    var parser = new INQImportParser(inqcharacter);
    expect(inqcharacter.Test1).to.not.deep.equal({a: '1', b: '2', c: '3'});
    expect(inqcharacter.Test2).to.not.deep.equal({a: '1', b: '2', c: '3', d: '4'});
    parser.saveProperty(['1', '2', '3'], ['Test1', ['a', 'b', 'c', 'd']]);
    parser.saveProperty(['1', '2', '3', '4', '5'], ['Test2', ['a', 'b', 'c', 'd']]);
    expect(inqcharacter.Test1).to.deep.equal({a: '1', b: '2', c: '3'});
    expect(inqcharacter.Test2).to.deep.equal({a: '1', b: '2', c: '3', d: '4'});
  });
});
