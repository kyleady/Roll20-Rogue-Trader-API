INQCharacterSheet.prototype.createSkill = function(inqlink) {
  let skill_name = inqlink.Name;
  let groups = [];
  const inqtest = new INQTest();
  for(let group of inqlink.Groups) {
    if(!inqtest.setCharacteristic(group)) {
      groups.push(group);
    }
  }
  if(groups.length) skill_name += `(${groups.join(', ')})`;

  const modifier1 = inqlink.Bonus >= 0  ? 20 : 0;
  const modifier2 = inqlink.Bonus >= 10 ? 10 : 0;
  const modifier3 = inqlink.Bonus >= 20 ? 10 : 0;
  const modifier4 = inqlink.Bonus >= 30 ? 10 : 0;

  inqtest.Characteristic = undefined;
  inqtest.setSkill(skill_name);
  const default_characteristic = inqtest.Characteristic || 'WS';

  return {
    'repeating_advancedskills_$$_advancedskillname': skill_name,
    'repeating_advancedskills_$$_advancedskillbox1': modifier1,
    'repeating_advancedskills_$$_advancedskillbox2': modifier2,
    'repeating_advancedskills_$$_advancedskillbox3': modifier3,
    'repeating_advancedskills_$$_advancedskillbox4': modifier4,
    'repeating_advancedskills_$$_advancedskillcharacteristic': default_characteristic
  }
}
