INQCharacterSheet.prototype.parseAttributes = function() {
  for(let old_name in this.Attributes) {
      let useMax = old_name == 'Wounds' || this.options['useMax'];
      let new_value = attributeValue(old_name, {
        max: useMax,
        graphicid: this.graphicid,
        characterid: this.characterid,
        CHARACTER_SHEET: this.options.CHARACTER_SHEET
      });
      if(new_value == undefined) continue;
      this.Attributes[old_name] = Number(new_value);
      if(this.Attributes[old_name] === NaN) {
        this.Attributes[old_name] = new_value;
      }
  }
}
