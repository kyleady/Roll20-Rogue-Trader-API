INQDamage.prototype.getDamDetails = function() {
  var details = damDetails();
  if(!details) return;
  for(var prop in details) {
    this[prop] = details[prop];
  }
}
