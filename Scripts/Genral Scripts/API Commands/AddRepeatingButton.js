const addRepeatingButton = (matches, msg, suggestedCMD, namePattern, abilityPattern) => {
  const name = matches[1];
  const extractId = (name, pattern) => {
    const splitName = name.split('_');
    const splitPattern = pattern.split('_');
    for(let i = 0; i < splitPattern.length; i++) {
      if(splitPattern[i] == '$$') {
        return splitName[i];
      }
    }
  }

  eachCharacter(msg, (character, graphic) => {
    const matchingAttrs = matchingRepeatingAttrs(namePattern, name, character.id);
    if(!suggestIfNotOne(matchingAttrs, name, suggestedCMD, msg.playerid)) return false;
    const matchingAttr = matchingAttrs[0];
    const repeatingId = extractId(matchingAttr.get('name'), namePattern);
    const ability = abilityPattern.replace('$$', repeatingId);
    const abilityName = matchingAttr.get('current');
    createObj('ability', {
      _characterid: character.id,
      name: abilityName,
      action: `%{selected|${ability}}`,
      istokenaction: true
    });

    const characterLink = getLink(character);
    whisper(`${abilityName} was added to ${characterLink}.`);
  }, { onlyOneCharacter: true} );
}
