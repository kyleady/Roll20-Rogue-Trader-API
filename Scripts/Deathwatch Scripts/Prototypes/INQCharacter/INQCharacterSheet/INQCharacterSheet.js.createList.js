INQCharacterSheet.prototype.createList = function(items, map_to_attrs, map_to_abilities) {
  for(let item of items) {
    let row_id = generateRowID();

    if(typeof map_to_attrs == 'function') {
      let attrs = map_to_attrs(item);
      for(let attr_name in attrs) {
        let attr_value = attrs[attr_name];
        if(attr_value.replace) attr_value = attr_value.replace(/<[^>]*>/g, '');
        let attr_with_id = attr_name.replace('$$', row_id);
        createObj('attribute', {
          name: attr_with_id,
          _characterid: this.characterid,
          current: attr_value,
          max: attr_value
        });
      }
    }

    if(typeof map_to_abilities == 'function') {
      let abilities = map_to_abilities(item);
      for(let ability_name in abilities) {
        let ability_value = abilities[ability_name];
        if(ability_value.replace) ability_value = ability_value.replace(/<[^>]*>/g, '');
        let ability_with_id = ability_name.replace('$$', row_id);
        createObj('ability', {
          name: ability_value,
          _characterid: this.characterid,
          action: `%{selected|${ability_with_id}}`,
          istokenaction: true
        });
      }
    }
  }
}
