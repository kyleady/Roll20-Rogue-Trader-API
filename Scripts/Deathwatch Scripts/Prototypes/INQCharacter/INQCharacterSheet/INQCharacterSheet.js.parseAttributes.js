INQCharacterSheet.prototype.parseAttributes = function() {
  /*
  const attr_lists = [
    INQCharacterSheet.armour(),
    INQCharacterSheet.attributes(),
    INQCharacterSheet.characteristics(),
    INQCharacteristics.unnatural()
  ];

  for(let attr_list of attr_lists) {
    for(let old_name in attr_list) {
      let new_name = attr_list[old_name];
      this.Attributes[old_name] = attributeValue(new_name, {
                                                  graphicid: this.graphicid,
                                                  characterid: this.characterid
                                                });
    }
  }
  */
  for(let old_name in this.Attributes) {
      let new_value = attributeValue(old_name, {
                                                  graphicid: this.graphicid,
                                                  characterid: this.characterid
                                                });
      this.Attributes[old_name] = Number(new_value);
      if(this.Attributes[old_name] === NaN) {
        this.Attributes[old_name] = new_value;
      }
  }
}
