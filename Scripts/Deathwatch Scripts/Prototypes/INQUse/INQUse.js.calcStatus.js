INQUse.prototype.calcStatus = function(){
  var target = getObj('graphic', this.inqtarget.GraphicID);
  if(target.get('status_brown')) {
    if(this.inqweapon.Class == 'Melee') {
      this.modifiers.push({Name: 'Prone', Value: 10});
    } else if(this.inqweapon.isRanged()) {
      this.modifiers.push({Name: 'Prone', Value: -10});
    }
  }

  if(target.get('status_green')){
    if(this.inqweapon.Class == 'Melee' || this.inqweapon.isRanged()){
      this.modifiers.push({Name: 'Stunned', Value: 20});
    }
  }

  if(target.get('status_blue')) {
    this.braced = true;
  }

  if(target.get('status_purple')) {
    if(this.inqweapon.Class == 'Melee' || this.inqweapon.isRanged()){
      this.modifiers.push({Name: 'Unaware', Value: 30});
    }
  }

  if(target.get('status_yellow')) {
    if(this.inqweapon.Class == 'Melee' || this.inqweapon.isRanged()){
      this.autoHit = true;
    }
  }
}
