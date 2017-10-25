INQImportParser.prototype.interpretLabeled = function(labeled){
  for(var i = 0; i < labeled.length; i++){
    labeled[i].content = labeled[i].content.replace(/\.\s*$/, "");
    var matched = false;
    for(var j = 0; j < this.Patterns.length; j++){
      if(this.Patterns[j].regex.test(labeled[i].label)){
        matched = true;
        this.Patterns[j].interpret.call(this, labeled[i].content, this.Patterns[j].property);
      }
    }
    if(!matched){
      this.SpecialRules.push({Name: labeled[i].label, Rule: labeled[i].content});
    }
  }
}
