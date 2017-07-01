function INQVehicleImportParser(){
  this.parse = function(text){
    var parser = new INQImportParser(this);
    parser.getContent(/^\s*type\s*$/i, ["Content", "Type"]);
    parser.getContent(/^\s*tactical\s+speed\s*$/i, ["Content", "Tactical Speed"]);
    parser.getNumber(/^\s*tactical\s+speed\s*$/i, ["Attributes", "Tactical Speed"]);
    parser.getContent(/^\s*cruising\s+speed\s*$/i, ["Content", "Cruising Speed"]);
    parser.getContent(/^\s*size\s*$/i, ["Content", "Size"]);
    parser.getContent(/^\s*crew\s*$/i, ["Content", "Crew"]);
    parser.getNumber(/^\s*manoeuvrability\s*$/i, ["Attributes", "Manoeuvrability"]);
    parser.getNumber(/^\s*structural\s+integrity\s*$/i, ["Attributes", "Structural Integrity"]);
    parser.getContent(/^\s*carry(ing)?\s+capacity\s*$/i, ["Content", "Carry Capacity"]);
    parser.getList(/^\s*vehicle\s+traits\s*$/i, ["List", "Vehicle Traits"]);
    parser.getWeapons(/^\s*weapons\s*$/i, ["List", "Weapons"]);
    parser.getArmour(/^\s*armour\s*$/i, ["Attributes", {
      Armour_F: /\s*front\s*/i,
      Armour_S: /\s*side\s*/i,
      Armour_R: /\s*rear\s*/i
    }]);
    parser.parse(text);
  }
}
