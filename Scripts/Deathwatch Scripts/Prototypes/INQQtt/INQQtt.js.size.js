INQQtt.prototype.size = function(){
  var inqtarget = this.inquse.inqtarget;
  var modifiers = this.inquse.modifiers;
  var inqweapon = this.inquse.inqweapon;
  if(!(inqweapon.Class == 'Melee' || inqweapon.isRanged())) return;
  var size = inqtarget.has('Size', 'Traits');
  if(size){
    for(var value of size){
      if(/^(1|Miniscule)$/i.test(value.Name)){
        modifiers.push({Name: 'Miniscule', Value: -30});
      } else if(/^(2|Puny)$/i.test(value.Name)){
        modifiers.push({Name: 'Puny', Value: -20});
      } else if(/^(3|Scrawny)$/i.test(value.Name)){
        modifiers.push({Name: 'Scrawny', Value: -10});
      } else if(/^(4|Average)$/i.test(value.Name)){

      } else if(/^(5|Hulking)$/i.test(value.Name)){
        modifiers.push({Name: 'Hulking', Value: 10});
      } else if(/^(6|Enormous)$/i.test(value.Name)){
        modifiers.push({Name: 'Enormous', Value: 20});
      } else if(/^(7|Massive)$/i.test(value.Name)){
        modifiers.push({Name: 'Massive', Value: 30});
      } else if(/^(8|Immense)$/i.test(value.Name)){
        modifiers.push({Name: 'Immense', Value: 40});
      } else if(/^(9|Monumental)$/i.test(value.Name)){
        modifiers.push({Name: 'Monumental', Value: 50});
      } else if(/^(10|Titanic)$/i.test(value.Name)){
        modifiers.push({Name: 'Titanic', Value: 60});
      }
    }
  }
}
