var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQWeapon.prototype.toAbility()', function() {
	it('should return an API Command in string form', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.List.Talents.push(new INQLink('Swift Attack'));
    var inqweapon = new INQWeapon('Knife(D10 R; Pen 0; Primitive, Balanced)');
    var action = inqweapon.toAbility(inqcharacter, {}, false);

    expect(action).to.equal('!useWeapon Knife{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|All Out Attack|Swift Attack}","target":"@{target|token_id}"}');
  });
  it('should default to no special ammunition if no ammo is given', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.List.Talents.push(new INQLink('Swift Attack'));
    var inqweapon = new INQWeapon('Knife(D10 R; Pen 0; Primitive, Balanced)');
    var action = inqweapon.toAbility(inqcharacter, {});

    expect(action).to.equal('!useWeapon Knife{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|All Out Attack|Swift Attack}","target":"@{target|token_id}"}');
  });
  it('should default to no options if no option object is given', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.List.Talents.push(new INQLink('Swift Attack'));
    var inqweapon = new INQWeapon('Knife(D10 R; Pen 0; Primitive, Balanced)');
    var action = inqweapon.toAbility(inqcharacter);

    expect(action).to.equal('!useWeapon Knife{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|All Out Attack|Swift Attack}","target":"@{target|token_id}"}');
  });
  it('should ignore features that require a character if no character is given', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('Knife(D10 R; Pen 0; Primitive, Balanced)');
    var action = inqweapon.toAbility();

    expect(action).to.equal('!useWeapon Knife{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|All Out Attack}","target":"@{target|token_id}"}');
  });
  it('should not include the RoF option of All Out Attack if the weapon is not a Melee weapon', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('Meltagun(Basic; 10m; S/-/-; 10D10 E; Pen 10; Melta)');
    var action = inqweapon.toAbility();

    expect(action).to.equal('!useWeapon Meltagun{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot}","target":"@{target|token_id}"}');
  });
  it('should not include the RoF option of Called Shot if the weapon cannot fire on Single', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('Storm Bolter(Basic; 150m; -/3/6; 2D10 X; Pen 5; Tearing, Storm)');
    var action = inqweapon.toAbility();

    expect(action).to.equal('!useWeapon Storm Bolter{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Semi Auto(3)|Full Auto(6)}","target":"@{target|token_id}"}');
  });
  it('should not include a roll20 choice for RoF, if there is only one choice', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('Heavy Bolter(Heavy; 300m; -/-/6; 3D10 X; Pen 5; Tearing)');
    var action = inqweapon.toAbility();

    expect(action).to.equal('!useWeapon Heavy Bolter{"modifiers":"?{Modifier|0}","RoF":"Full Auto(6)","target":"@{target|token_id}"}');
  });
  it('should not include the Roll20 choice of Called Shot if the weapon is Psychic', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('Bolt of Change(Psychic; PR x 10m; PRD10 E; Pen 2PR)');
    var action = inqweapon.toAbility();

    expect(action).to.equal('!useWeapon Bolt of Change{"modifiers":"?{Modifier|0}","RoF":"Single","target":"@{target|token_id}"}');
  });
  it('should include the Rate of Fire Formula in Parentheses if firing on Semi or Full Auto', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqweapon = new INQWeapon('Fire Barrage(Psychic; PR x 5m; S/PR/2PR; D10 + PR E; Pen PR; Fire)');
    var action = inqweapon.toAbility();

    expect(action).to.equal('!useWeapon Fire Barrage{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Semi Auto(PR)|Full Auto(2PR)}","target":"@{target|token_id}"}');
  });
  it('should include the Swift Attack option if the weapon is a Melee Weapon and the Character has the Swift Attack Talent', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var rangedweapon = new INQWeapon('Meltagun(Basic; 10m; S/-/-; 10D10 E; Pen 10; Melta)');
    var meleeweapon = new INQWeapon('Knife(D10 R; Pen 0; Primitive, Balanced)');
    var action;

    action = rangedweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Meltagun{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot}","target":"@{target|token_id}"}');

    action = meleeweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Knife{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|All Out Attack}","target":"@{target|token_id}"}');

    inqcharacter.List.Talents.push(new INQLink('Swift Attack'));

    action = rangedweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Meltagun{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot}","target":"@{target|token_id}"}');

    action = meleeweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Knife{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|All Out Attack|Swift Attack}","target":"@{target|token_id}"}');
  });
  it('should include the Lightning Attack option if the weapon is a Melee Weapon and the Character has the Lightning Attack Talent', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var rangedweapon = new INQWeapon('Meltagun(Basic; 10m; S/-/-; 10D10 E; Pen 10; Melta)');
    var meleeweapon = new INQWeapon('Knife(D10 R; Pen 0; Primitive, Balanced)');
    var action;

    action = rangedweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Meltagun{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot}","target":"@{target|token_id}"}');

    action = meleeweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Knife{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|All Out Attack}","target":"@{target|token_id}"}');

    inqcharacter.List.Talents.push(new INQLink('Swift Attack'));
    inqcharacter.List.Talents.push(new INQLink('Lightning Attack'));

    action = rangedweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Meltagun{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot}","target":"@{target|token_id}"}');

    action = meleeweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Knife{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|All Out Attack|Swift Attack|Lightning Attack}","target":"@{target|token_id}"}');
  });
  it('should not include the RoF option or the Modifier option if the weapon has the Spray quality and is not Psychic', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Psychic Character';
    var psychicweapon = new INQWeapon('Avenger(Psychic; 30m; S/-/-; 2D10 E; Pen 2PR; Spray, Fire)');
    var rangedweapon = new INQWeapon('Flamer(Basic; 20m; S/-/-; D10+3 E; Pen 4; Spray, Fire)');
    var action;

    action = psychicweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Avenger{"modifiers":"?{Modifier|0}","RoF":"Single","BonusPR":"?{Bonus Psy Rating|0}","target":"@{target|token_id}"}');

    action = rangedweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Flamer{"RoF":"Single","target":"@{target|token_id}"}');
  });
  it('should include an EffectivePR option with a roll20 choice if the weapon is psychic', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Psychic Character';
    var psychicweapon = new INQWeapon('Smite(Psychic; PR x 10m; S/-/-; PRD10 E; Pen PR; Blast[PR])');

    var action = psychicweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Smite{"modifiers":"?{Modifier|0}","RoF":"Single","BonusPR":"?{Bonus Psy Rating|0}","target":"@{target|token_id}"}');
  });
	it('should include a FocusStrength choice if the character has Unbound Psyker', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
		inqcharacter.List.Traits.push(new INQLink('Unbound Psyker'));
    inqcharacter.Name = 'Psychic Character';
    var psychicweapon = new INQWeapon('Smite(Psychic; PR x 10m; S/-/-; PRD10 E; Pen PR; Blast[PR])');

    var action = psychicweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Smite{"modifiers":"?{Modifier|0}","RoF":"Single","FocusStrength":"?{Focus Strength|Unfettered|Push|True}","BonusPR":"?{Bonus Psy Rating|0}","target":"@{target|token_id}"}');
  });
	it('should include a FocusStrength choice if the character has Bound Psyker', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
		inqcharacter.List.Traits.push(new INQLink('Bound Psyker'));
    inqcharacter.Name = 'Psychic Character';
    var psychicweapon = new INQWeapon('Smite(Psychic; PR x 10m; S/-/-; PRD10 E; Pen PR; Blast[PR])');

    var action = psychicweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Smite{"modifiers":"?{Modifier|0}","RoF":"Single","FocusStrength":"?{Focus Strength|Fettered|Unfettered|Push}","BonusPR":"?{Bonus Psy Rating|0}","target":"@{target|token_id}"}');
  });
  it('should include an ammo option if an array of ammunition is given', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqweapon = new INQWeapon('Bolter(Basic; 150m; S/3/-; 2D10 X; Pen 4; Tearing)');

    var action = inqweapon.toAbility(inqcharacter, {}, ['', 'Hellfire', 'Kraken Rounds']);
    expect(action).to.equal('!useWeapon Bolter{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|Semi Auto(3)}","Ammo":"?{Special Ammunition||Hellfire|Kraken Rounds}","target":"@{target|token_id}"}');
  });
  it('should not include a roll20 choice in the ammo option if the array has a size of 1', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqweapon = new INQWeapon('Bolter(Basic; 150m; S/3/-; 2D10 X; Pen 4; Tearing)');

    var action = inqweapon.toAbility(inqcharacter, {}, ['Vengeance Rounds']);
    expect(action).to.equal('!useWeapon Bolter{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|Semi Auto(3)}","Ammo":"Vengeance Rounds","target":"@{target|token_id}"}');
  });
  it('should include a roll20 choice in Special if the weapon can use Maximal', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqweapon = new INQWeapon('Plasma Pistol(Pistol; 30m; S/2/-; 6D10 E; Pen 8; Maximal, Overheats)');

    var action = inqweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Plasma Pistol{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|Semi Auto(2)}","Special":"?{Fire on Maximal?|Use Maximal|}","target":"@{target|token_id}"}');
  });
	it('should include a roll20 choice in Special if the weapon can use Overcharge', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqweapon = new INQWeapon('Sonic Boom(Pistol; 30m; S/2/-; 6D10 E; Pen 8; Overcharge)');

    var action = inqweapon.toAbility(inqcharacter);
    expect(action).to.equal('!useWeapon Sonic Boom{"modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|Semi Auto(2)}","Special":"?{Fire on Overcharge?|Use Overcharge|}","target":"@{target|token_id}"}');
  });
  it('should record the weapon in options.custum if option.custom was true', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqweapon = new INQWeapon('Scything Talons (D10+2 R; Pen 3)');

    var action = inqweapon.toAbility(inqcharacter, {custom: true});
    expect(action).to.equal('!useWeapon Scything Talons{"custom":"Scything Talons (Melee; D10 + 2 R; Pen 3)","modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|All Out Attack}","target":"@{target|token_id}"}');
  });
	it('should allow you to record other details of the Weapon in the options', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var inqweapon = new INQWeapon('Plasma Pistol(Pistol; 30m; S/2/-; 6D10 E; Pen 8; Maximal, Overheats)');

    var action = inqweapon.toAbility(inqcharacter, {Range: '100'});
    expect(action).to.equal('!useWeapon Plasma Pistol{"Range":"100","modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|Semi Auto(2)}","Special":"?{Fire on Maximal?|Use Maximal|}","target":"@{target|token_id}"}');
  });
	it('should account for changes you made in the options', function(){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    var plasmaweapon = new INQWeapon('Plasma Pistol(Pistol; 30m; S/2/-; 6D10 E; Pen 8; Maximal, Overheats)');
		var meltaweapon  = new INQWeapon('Infernus Pistol(Pistol; 30m; S/-/-; 5D10 E; Pen 20; Melta)');
		var action;

    action = plasmaweapon.toAbility(inqcharacter, {Semi: '3', Full: '5'});
    expect(action).to.equal('!useWeapon Plasma Pistol{"Semi":"3","Full":"5","modifiers":"?{Modifier|0}","RoF":"?{Rate of Fire|Single|Called Shot|Semi Auto(3)|Full Auto(5)}","Special":"?{Fire on Maximal?|Use Maximal|}","target":"@{target|token_id}"}');

		action = meltaweapon.toAbility(inqcharacter, {Special: 'Overheats, Spray'});
    expect(action).to.equal('!useWeapon Infernus Pistol{"Special":"Overheats, Spray","RoF":"Single","target":"@{target|token_id}"}');
  });
});
