INQCharacterSheet.prototype.createList = function(items, map_to_attrs) {
  for(let item of items) {
    let row_id = generateRowID();
    let attrs = map_to_attrs(item);
    for(let attr_name in attrs) {
      let attr_value = attrs[attr_name];
      let attr_with_id = attr_name.replace('$$', row_id);
      createObj('attribute', {
        name: attr_with_id,
        _characterid: this.characterid,
        current: attr_value,
        max: attr_value
      });
    }
  }
}
