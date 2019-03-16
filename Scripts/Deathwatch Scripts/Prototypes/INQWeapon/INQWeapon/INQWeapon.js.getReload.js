INQWeapon.prototype.getReload = function() {
  if(this.Reload == 0){
    return 'Free';
  } else if(this.Reload == 0.5){
    return 'Half';
  } else if(this.Reload == 1){
    return 'Full';
  } else if(this.Reload > 1) {
    return this.Reload + ' Full';
  } else {
    return '';
  }
}
