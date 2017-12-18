INQTest.prototype.setCharacteristic = function(input){
  if(!input) return false;
  var characteristics = INQTest.characteristics();
  for(var characteristic of characteristics){
    if(toRegex(characteristic).test(input)){
      this.Characteristic = characteristic.Name
      this.PartyStat = characteristic.PartyStat;
      return true;
    }
  }

  return false;
}
