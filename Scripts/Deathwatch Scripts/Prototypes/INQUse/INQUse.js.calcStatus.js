INQUse.prototype.calcStatus = function(){
  var attacker, target;
  if(this.inqcharacter) attacker = getObj('graphic', this.inqcharacter.GraphicID);
  if(this.inqtarget) target = getObj('graphic', this.inqtarget.GraphicID);
  if(attacker) {
    if(attacker.get('status_blue')) {
      this.braced = true;
    }

    if(attacker.get('status_purple')) {
      if(this.inqweapon.Class == 'Melee' || this.inqweapon.isRanged()){
        this.modifiers.push({Name: 'Unaware', Value: 30});
      }
    }
  }

  if(target) {
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

    if(target.get('status_yellow')) {
      if(this.inqweapon.Class == 'Melee' || this.inqweapon.isRanged()){
        this.autoHit = true;
      }
    }
  }
}
