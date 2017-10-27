INQImportParser.prototype.interpretLabeled = function(labeledLines){
  for(var line of labeledLines){
    line.content = line.content.replace(/\.\s*$/, '');
    var matched = false;
    for(var pattern of this.Patterns){
      if(pattern.regex.test(line.label)){
        matched = true;
        if(pattern.interpret){
          pattern.interpret.call(this, line.content, pattern.property);
        }
      }
    }
    if(!matched) this.SpecialRules.push({Name: line.label, Rule: line.content});
  }
}
