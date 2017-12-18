INQWeapon.prototype.removeQuality = function(special){
  for(var i = 0; i < this.Special.length; i++){
    if(this.Special[i].Name == special){
      this.Special.splice(i, 1);
      i--;
      return true;
    }
  }
  
  return false;
}
