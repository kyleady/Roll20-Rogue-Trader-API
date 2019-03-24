const matchingRepeatingAttrs = (pattern, name, characterid) => {
  const stringRegExp = `^${pattern.replace('$$','[^_]+')}$`;
  const namePattern = RegExp(stringRegExp);

  const nameKeywords = name.toLowerCase().split(' ');
  matchingNameAttributes = filterObjs((obj) => {
    if(obj.get('_type') != 'attribute') return false;
    if(obj.get('_characterid') != characterid) return false;

    const attribute_name = obj.get('name');
    if(!namePattern.test(attribute_name)) return false;

    const attribute_value = obj.get('current').toLowerCase();
    for(let keyword of nameKeywords) {
      if(attribute_value.indexOf(keyword) < 0) return false;
    }

    return true;
  });

  for(let matchingNameAttribute of matchingNameAttributes) {
    if(matchingNameAttribute.get('current') == name) {
      return [matchingNameAttribute];
    }
  }

  return matchingNameAttributes;
}
