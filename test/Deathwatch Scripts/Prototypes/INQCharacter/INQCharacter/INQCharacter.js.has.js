var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQCharacter.prototype.has()', function() {
	it('should search the named list for the named link', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.List.Talents.push(new INQLink('Double Team'));

    expect(inqcharacter.has('Double Team', 'Talents')).to.not.equal(undefined);
  });
  it('should return undefined if it isn\'t found', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.List.Talents.push(new INQLink('Swift Attack'));

    expect(inqcharacter.has('Lightning Attack', 'Talents')).to.equal(undefined);
  });
  it('should return an object with the bonus if it exists', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Awareness+23'));

    expect(inqcharacter.has('Awareness', 'Skills')).to.deep.equal({Bonus: 23});
  });
  it('should return an array of objects with their own bonuses if the item has a subgroup', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Scholastic Lore(Occult, Astromancy)+10'));

    expect(inqcharacter.has('Scholastic Lore', 'Skills')).to.deep.equal([{Name: 'Occult', Bonus: 10}, {Name: 'Astromancy', Bonus: 10}]);
  });
  it('should gather subgroups from each matching Skill', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Navigate(Surface)'));
    inqcharacter.List.Skills.push(new INQLink('Navigate(Warp)+20'));

    expect(inqcharacter.has('Navigate', 'Skills')).to.deep.equal([{Name: 'Surface', Bonus: 0}, {Name: 'Warp', Bonus: 20}]);
  });
  it('should allow a Skill without a subgroup to override the Bonus for a subgroup if it is better', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Forbidden Lore(Mutants)+30'));
    inqcharacter.List.Skills.push(new INQLink('Forbidden Lore(Psychics)+5'));
    inqcharacter.List.Skills.push(new INQLink('Forbidden Lore+10'));

    expect(inqcharacter.has('Forbidden Lore', 'Skills')).to.deep.equal([
      {Name: 'Mutants', Bonus: 30},
      {Name: 'Psychics', Bonus: 10},
      {Name: 'all', Bonus: 10}
    ]);
  });
  it('should return an array, even if there is only one subgroup', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.List.Skills.push(new INQLink('Pilot(Skimmer)'));

    expect(inqcharacter.has('Pilot', 'Skills')).to.deep.equal([{Name: 'Skimmer', Bonus: 0}]);
  });
});
