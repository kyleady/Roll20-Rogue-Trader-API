INQTest.prototype.addModifier = function(modifiers){
  if(Array.isArray(modifiers)) {
    for(var modifier of modifiers) {
      this.addModifier(modifier);
    }
  } else if (typeof modifiers == 'string' || typeof modifiers == 'number') {
    this.addModifier({Value: modifiers});
  } else if(typeof modifiers == 'object'){
    if(!modifiers.Name) modifiers.Name = 'Other';
    modifiers.Value = Number(modifiers.Value);
    if(!modifiers.Value) return;
    this.Modifiers.push(modifiers);
  }
}
