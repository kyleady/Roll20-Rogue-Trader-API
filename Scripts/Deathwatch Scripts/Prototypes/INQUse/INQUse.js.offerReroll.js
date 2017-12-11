INQUse.prototype.offerReroll = function(originalOptions){
  var options = carefulParse(originalOptions) || {};
  options.freeShot = true;
  var suggestion = 'useWeapon ' + this.inqweapon.Name + JSON.stringify(options);
  suggestion = '!{URIFixed}' + encodeURIFixed(suggestion);
  this.reroll = '[Reroll](' + suggestion + ')';
}
