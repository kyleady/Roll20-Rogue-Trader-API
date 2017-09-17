function INQVehicleImportParser(){
  this.parse = function(text){
    var parser = new INQImportParser(this);
    parser.getContent(/^\s*type\s*$/i, ["Bio", "Type"]);
    parser.getContent(/^\s*tactical\s+speed\s*$/i, ["Bio", "Tactical Speed"]);
    parser.getContent(/^\s*cruising\s+speed\s*$/i, ["Bio", "Cruising Speed"]);
    parser.getContent(/^\s*size\s*$/i, ["Bio", "Size"]);
    parser.getContent(/^\s*crew\s*$/i, ["Bio", "Crew"]);
    parser.getNumber(/^\s*manoeuvrability\s*$/i, ["Attributes", "Manoeuvrability"]);
    parser.getNumber(/^\s*structural\s+integrity\s*$/i, ["Attributes", "Structural Integrity"]);
    parser.getContent(/^\s*carry(ing)?\s+capacity\s*$/i, ["Bio", "Carry Capacity"]);
    parser.getList(/^\s*vehicle\s+traits\s*$/i, ["List", "Vehicle Traits"]);
    parser.getWeapons(/^\s*weapons\s*$/i, ["List", "Weapons"]);
    parser.getArmour(/^\s*armour\s*$/i, ["Attributes", {
      Armour_F: /\s*front\s*/i,
      Armour_S: /\s*side\s*/i,
      Armour_R: /\s*rear\s*/i
    }]);
    parser.parse(text);

    this.getSpeeds();
  }

  this.getSpeeds = function(){
    var speed = this.Bio["Tactical Speed"] + "";
    log(typeof speed)
    var matches = speed.match(/(\d+)\s*m/);
    if(matches){
      this.Attributes["Tactical Speed"] = Number(matches[1]);
    }
    matches = speed.match(/(\d+)\s*(?:<[^>]+>)?AUs/);
    if(matches){
      this.Attributes["Aerial Speed"] = Number(matches[1]);
    }
  }
}
