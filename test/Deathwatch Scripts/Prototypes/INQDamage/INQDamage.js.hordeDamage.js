var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
require('mock20');
describe('INQDamage.prototype.hordeDamage()', function() {
	it('should X out a number of tokens with matching horde labels equal to the number of Hits', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 14;
    var character = inqcharacter.toCharacterObj();
    var impactHead = createObj('handout', {name: 'Impact Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(character, graphic, function(inqdamage) {
			inqdamage.damage = 1;
			inqdamage.Hits.set('current', 2);
			on('chat:message', () => done());
			inqdamage.hordeDamage(graphic);
			var dead = 0;
			if(graphic.get('status_dead')) dead++;
			if(graphic1.get('status_dead')) dead++;
			if(graphic2.get('status_dead')) dead++;
			expect(dead).to.equal(2);
    });
  });
	it('should X out nothing if the damage property is zero or less', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 14;
    var character = inqcharacter.toCharacterObj();
    var impactHead = createObj('handout', {name: 'Impact Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(character, graphic, function(inqdamage) {
			inqdamage.damage = 0;
			inqdamage.Hits.set('current', 2);
			on('chat:message', () => done());
			inqdamage.hordeDamage(graphic);
			var dead = 0;
			if(graphic.get('status_dead')) dead++;
			if(graphic1.get('status_dead')) dead++;
			if(graphic2.get('status_dead')) dead++;
			expect(dead).to.equal(0);
    });
  });
	it('should warn if the Hits value is invalid', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 14;
    var character = inqcharacter.toCharacterObj();
    var impactHead = createObj('handout', {name: 'Impact Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(character, graphic, function(inqdamage) {
			inqdamage.damage = 10;
			inqdamage.Hits.set('current', 'Invalid');
			on('chat:message', function(msg) {
				expect(msg.target).to.equal('gm');
				expect(msg.content).to.include('Hits');
				done();
			});

			inqdamage.hordeDamage(graphic);
			var dead = 0;
			if(graphic.get('status_dead')) dead++;
			if(graphic1.get('status_dead')) dead++;
			if(graphic2.get('status_dead')) dead++;
			expect(dead).to.equal(0);
    });
  });
	it('should ignore graphics that do not share the same horde label', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 14;
    var character = inqcharacter.toCharacterObj();
    var impactHead = createObj('handout', {name: 'Impact Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'h3'});
		var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'h3'});
		new INQDamage(character, graphic, function(inqdamage) {
			inqdamage.damage = 10;
			inqdamage.Hits.set('current', 2);
			on('chat:message', () => done());
			inqdamage.hordeDamage(graphic);
			expect(graphic.get('status_dead')).to.equal(true);
			expect(graphic1.get('status_dead')).to.equal(false);
			expect(graphic2.get('status_dead')).to.equal(false);
    });
  });
	it('should ignore graphics that are on different pages', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 14;
    var character = inqcharacter.toCharacterObj();
    var impactHead = createObj('handout', {name: 'Impact Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
		var page2 = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		var graphic1 = createObj('graphic', {_pageid: page2.id, bar2_value: 'H3'});
		var graphic2 = createObj('graphic', {_pageid: page2.id, bar2_value: 'H3'});
		new INQDamage(character, graphic, function(inqdamage) {
			inqdamage.damage = 10;
			inqdamage.Hits.set('current', 2);
			on('chat:message', () => done());
			inqdamage.hordeDamage(graphic);
			expect(graphic.get('status_dead')).to.equal(true);
			expect(graphic1.get('status_dead')).to.equal(false);
			expect(graphic2.get('status_dead')).to.equal(false);
    });
  });
	it('should record the leftover horde damage in Hits', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 14;
    var character = inqcharacter.toCharacterObj();
    var impactHead = createObj('handout', {name: 'Impact Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(character, graphic, function(inqdamage) {
			inqdamage.damage = 1;
			inqdamage.Hits.set('current', 10);
			on('chat:message', () => done());
			inqdamage.hordeDamage(graphic);
			expect(inqdamage.Hits.get('current')).to.equal(7);
    });
  });
	it('should report the Horde Damage done publicaly', function(done){
		Campaign().MOCK20reset();
		var filePath = path.join(__dirname, '..', '..', '..', '..', 'INQTotal.js');
		var MyScript = fs.readFileSync(filePath, 'utf8');
		eval(MyScript);
		MOCK20endOfLastScript();

    var inqcharacter = new INQCharacter();
    inqcharacter.Name = 'Crit Character';
    inqcharacter.Attributes.Wounds = 14;
    var character = inqcharacter.toCharacterObj();
    var impactHead = createObj('handout', {name: 'Impact Critical Effects - Head'});
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		var graphic1 = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		var graphic2 = createObj('graphic', {_pageid: page.id, bar2_value: 'H3'});
		new INQDamage(character, graphic, function(inqdamage) {
			inqdamage.damage = 1;
			inqdamage.Hits.set('current', 10);
			on('chat:message', function(msg) {
				expect(msg.type).to.equal('general');
				expect(msg.inlinerolls[0].expression).to.equal('3');
				done();
			});

			inqdamage.hordeDamage(graphic);
			var dead = 0;
			if(graphic.get('status_dead')) dead++;
			if(graphic1.get('status_dead')) dead++;
			if(graphic2.get('status_dead')) dead++;
			expect(dead).to.equal(3);
    });
  });
});
