const INQSkillsQuery = (matches, msg) => {
  eachCharacter(msg, (character, graphic) => {
    log(`==${character.get('name')} Skills==`)
    INQCharacter(character, graphic, (inqcharacter) => {
      inqcharacter.List.Skills.forEach((inqskill) => {
        if(inqskill.Groups.length) {
          inqskill.Groups.forEach((group) => {
            group.split(',').forEach((subgroup) => {
              log(`${inqskill.Name} : (${subgroup.trim()}) : +${inqskill.Bonus}`)
            });
          });
        } else {
          log(`${inqskill.Name} : +${inqskill.Bonus}`)
        }
      });
      whisper(`${character.get('name')} skills logged.`);
    });
  });
}

const INQTalentsQuery = (matches, msg, options) => {
  options = options || {};
  const type = options.type || 'Talents';
  eachCharacter(msg, (character, graphic) => {
    log(`==${character.get('name')} ${type}==`)
    INQCharacter(character, graphic, (inqcharacter) => {
      inqcharacter.List[type].forEach((inqtalent) => {
        if(inqtalent.Groups.length) {
          inqtalent.Groups.forEach((group) => {
            group.split(',').forEach((subgroup) => {
              log(`${inqtalent.Name} : (${subgroup.trim()})`)
            });
          });
        } else {
          log(`${inqtalent.Name}`)
        }
      });
      whisper(`${character.get('name')} ${type} logged.`);
    });
  });
}

const INQTraitsQuery = (matches, msg) => INQTalentsQuery(matches, msg, { type: 'Traits' });

const INQBioQuery = (matches, msg) => {
    const type = matches[1].toLowerCase();
    eachCharacter(msg, (character, graphic) => {
       character.get(type, (notes) => {
          log(`==${character.get('name')} ${type.toTitleCase()}==`);
          notes.split(/\s*<(?:\/?p|br)[^>]*>\s*/).forEach((line) => {
            log(line);
          });
          whisper(`${character.get('name')} ${type.toTitleCase()} logged.`);
       });
    });
}

on('ready', () => {
  CentralInput.addCMD(/!\s*skills\s*\?\s*$/i, INQSkillsQuery);
  CentralInput.addCMD(/!\s*talents\s*\?\s*$/i, INQTalentsQuery);
  CentralInput.addCMD(/!\s*traits\s*\?\s*$/i, INQTraitsQuery);
  CentralInput.addCMD(/!\s*(gmnotes|bio)\s*\?\s*$/i, INQBioQuery);
});
