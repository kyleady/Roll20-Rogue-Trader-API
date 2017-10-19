INQImportParser.prototype.interpretLabeled = function(labeled){
  for(var i = 0; i < labeled.length; i++){
    labeled[i].content = labeled[i].content.replace(/\.\s*$/, "");
    var matched = false;
    for(var j = 0; j < Patterns.length; j++){
      if(Patterns[j].regex.test(labeled[i].label)){
        matched = true;
        Patterns[j].interpret.call(this, labeled[i].content, Patterns[j].property);
      }
    }
    if(!matched){
      this.SpecialRules.push({Name: labeled[i].label, Rule: labeled[i].content});
    }
  }
}
