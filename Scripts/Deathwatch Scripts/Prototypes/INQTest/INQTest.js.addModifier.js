INQTest.prototype.addModifier = function(modifiers){
  if(!modifiers) return;
  if(typeof modifiers == 'string') modifiers = Number(modifiers);
  if(typeof modifiers == 'number') this.Modifiers.push({Name: 'Other', Value: modifiers});
  if(Array.isArray(modifiers)) {
    for(var modifier of modifiers) {
      this.addModifier(modifier);
    }
    return;
  }
  if(typeof modifiers == 'object'){
    if(!modifiers.Name) modifiers.Name = 'Custom';
    if(typeof modifiers.Value == 'string') modifiers.Value = Number(modifiers.Value);
    if(!modifiers.Value) return;
    this.Modifiers.push(modifiers);
  }
}
