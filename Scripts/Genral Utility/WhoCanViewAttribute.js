function canViewAttribute(name, options){
  if(typeof options != 'object') options = false;
  options = options || {};
  var attribute = getAttribute(name, options);
  if(!attribute) return;
  var character = getObj('character', attribute.get('_characterid'));
  return viewerList = character.get('inplayerjournals').split(',');
}
