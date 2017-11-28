function warpEncounter(matches, msg){
  var days = Number(matches[1]);
  var period = Number(matches[2]) || 5;
  var events = Math.floor(days / period);
  var modifier = 60 - 5 * events;

  var potentialPerils = [
    {god: 'Slaanesh', threat: 'Corruption'},
    {god: 'Slaanesh', threat: 'Morale'},
    {god: 'Nurgle', threat: 'Damage'},
    {god: 'Nurgle', threat: 'Population'},
    {god: 'Khorne', threat: 'Critical'},
    {god: 'Khorne', threat: 'Hull'},
    {god: 'Tzeentch', threat: 'Insanity'},
    {god: 'Tzeentch', threat: 'Damaged Components'}
  ];
  var perils = [];
  var highest = 0;
  var roll;
  for(var peril of potentialPerils){
    roll = randomInteger(10);
    if(roll > highest) perils = [];
    if(roll >= highest) {
      highest = roll;
      perils.push(peril);
    }
  }

  var god;
  for(var peril of perils){
    if(!god) {
      god = peril.god;
    } else if(god != peril.god) {
      god = 'Undivided';
      break;
    }
  }

  var skills;
  switch(god){
    case 'Slaanesh':
      skills = [
        'Acrobatics',
        'Charm',
        'Dodge',
        {Name: 'Performer', Subgroups: [
          'Dancer',
          'Musician',
          'Singer',
          'Storyteller'
        ]},
        {Name: 'Pilot', Subgroups: [
          'Personal',
          'Flyers',
          'Space Craft'
        ]},
        'Tactics(Air Combat)'
      ];
    break;
    case 'Nurgle':
      skills = [
        {Name: 'Common Lore', Subgroups: [
          'Adeptus Arbites',
          'Adeptus Astra Telepathica',
          'Adeptus Mechanicus',
          'Administratum',
          'Ecclesiarchy',
          'Imperial Creed',
          'Imperial Guard',
          'Imperial Navy',
          'Imperium',
          'Koronus Expanse',
          'Jericho Reach',
          'Callaxis Sector',
          'Navis Nobilite',
          'Rogue Traders',
          'Screaming Vortex',
          'Tech',
          'War'
        ]},
        'Medicae',
        'Intimidate',
        'Survival',
        'Tactics(Defensive Doctrine)'
      ];
    break;
    case 'Khorne':
      skills = [
        'Climb',
        'Command',
        {Name: 'Drive', Subgroups: [
          'Ground Vehicle',
          'Skimmer/Hover',
          'Walker'
        ]},
        'Parry',
        'Swim',
        {Name: 'Tactics', Subgroups: [
          'Assault Doctrine',
          'Armoured Assault',
          'Void Combat'
        ]},
        'Tracking'
      ];
    break;
    case 'Tzeentch':
      skills = [
        {Name: 'Forbidden Lore', Subgroups: [
          'Adeptus Mechanicus',
          'Archeotech',
          'Daemonology',
          'Heresy',
          'Inquisition',
          'Mutants',
          'Navigators',
          'Pirates',
          'Psykers',
          'Warp',
          'Xenos'
        ]},
        'Logic',
        'Awareness',
        'Deceive',
        'Tactics(Stealth and Recon)'
      ];
    break;
    default:
      skills = [
        'Blather',
        'Chem-Use',
        'Commerce',
        'Concealment',
        'Demolition',
        'Evaluate',
        'Gamble',
        'Inquiry',
        'Interrogation',
        'Literacy',
        {Name: 'Navigation', Subgroups: [
          'Surface',
          'Warp',
          'Stellar'
        ]},
        {Name: 'Scholastic Lore', Subgroups: [
          'Archaic',
          'Astromancy',
          'Beasts',
          'Bureaucracy',
          'Chymistry',
          'Cryptology',
          'Heraldry',
          'Imperial Warrants',
          'Imperial Creed',
          'Judgement',
          'Legend',
          'Navis Nobilite',
          'Numerology',
          'Occult',
          'Philosophy',
          'Tactica Imperialis'
        ]},
        'Security',
        'Sleight of Hand',
        'Shadowing',
        'Silent Move',
        {Name: 'Trade', Subgroups: [
          'Archaeologist',
          'Armourer',
          'Astrographer',
          'Chymist',
          'Cryptographer',
          'Explorator',
          'Linguist',
          'Remembrancer',
          'Shipwright',
          'Soothsayer',
          'Technomat',
          'Trader',
          'Voidfarer'
        ]},
        'Wrangling',
        'Tech-Use',
        'Psyniscience'
      ];
    break;
  }

  var skill = skills[randomInteger(skills.length)-1];
  if(typeof skill == 'object') {
    var skillName = skill.Name;
    skillName += '(';
    skillName += skill.Subgroups[randomInteger(skill.Subgroups.length)-1];
    skillName += ')';
    skill = skillName;
  }

  var output = '<strong>Skill</strong>: ';
  output += skill;
  if(modifier >= 0) output += '+';
  output += modifier;
  output += '<br>';
  output += '<strong>God</strong>: ';
  output += god;
  output += '<br>';
  output += '<strong>Threats</strong><br>'
  for(var peril of perils){
    output += peril.threat;
    output += '<br>';
  }

  whisper(output);
}

on('ready', function(){
  CentralInput.addCMD(/^!\s*warp\s*encounter\s*(\d+)\s*(?:\/\s*(\d+))?\s*$/i, warpEncounter);
});
