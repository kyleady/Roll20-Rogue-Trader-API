//saves any notes on the character
INQVehicleParser.prototype.parseLabels = function(){
  for(var i = 0; i < this.Content.Rules.length; i++){
    var label = this.Content.Rules[i].Name;
    var content = this.Content.Rules[i].Content;
    if(/^\s*type\s*$/i.test(label)){
      this.parseType(content);
    } else if(/^\s*tactical\s+speed\s*$/i.test(label)){
      this.parseTacticalSpeed(content);
    } else if(/^\s*cruising\s+speed\s*$/i.test(label)){
      this.parseCruisingSpeed(content);
    } else if(/^\s*size\s*$/i.test(label)){
      this.parseSize(content);
    } else if(/^\s*vehicle\s+traits\s*$/i.test(label)){
      this.parseVehicleTraits(content);
    } else if(/^\s*crew\s*$/i.test(label)){
      this.parseCrew(content);
    } else if(/^\s*carry(ing)?\s+capacity\s*$/i.test(label)){
      this.parseCarryingCapacity(content);
    } else if(/^\s*renown\s*$/i.test(label)){
      this.parseRenown(content);
    } else if(/^\s*availability\s*$/i.test(label)){
      this.parseAvailability(content);
    } else {
      this.SpecialRules.push({
        Name: this.Content.Rules[i].Name,
        Rule: this.Content.Rules[i].Content
      });
    }
  }
}
