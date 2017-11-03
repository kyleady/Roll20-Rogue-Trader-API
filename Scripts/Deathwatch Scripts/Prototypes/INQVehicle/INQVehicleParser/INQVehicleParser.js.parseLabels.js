//saves any notes on the character
INQVehicleParser.prototype.parseLabels = function(){
  for(var i = 0; i < this.Content.Rules.length; i++){
    var label = this.Content.Rules[i].Name.trim();
    var content = this.Content.Rules[i].Content.trim();
    if(/^\s*type\s*$/i.test(label)){
      this.Bio.Type = new INQLink(content);
    } else if(/^\s*tactical\s+speed\s*$/i.test(label)){
      this.Bio['Tactical Speed'] = content;
    } else if(/^\s*cruising\s+speed\s*$/i.test(label)){
      this.Bio['Cruising Speed'] = content;
    } else if(/^\s*size\s*$/i.test(label)){
      this.Bio.Size = content;
    } else if(/^\s*crew\s*$/i.test(label)){
      this.Bio.Crew = content;
    } else if(/^\s*carry(ing)?\s+capacity\s*$/i.test(label)){
      this.Bio['Carry Capacity'] = content;
    } else if(/^\s*renown\s*$/i.test(label)){
      this.Bio.Renown = content;
    } else if(/^\s*availability\s*$/i.test(label)){
      this.Bio.Availability = content;
    } else {
      this.SpecialRules.push({Name: label, Rule: content});
    }
  }
}
