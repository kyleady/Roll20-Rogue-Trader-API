function modifyAttribute(attribute, options) {
  if (typeof options != 'object' ) options = {};
  if(options.workingWith != 'max') options.workingWith = 'current';
  if(!options.sign) options.sign = '';
  if(typeof options.modifier == 'number') options.modifier = options.modifier.toString();

  if(attribute.get) {
    attribute = {
      current: attribute.get('current'),
      max: attribute.get('max')
    };
  }

  if(/\$\[\[\d+\]\]/.test(options.modifier)){
    var inlineMatch = options.modifier.match(/\$\[\[(\d+)\]\]/);
    if(inlineMatch && inlineMatch[1]){
      var inlineIndex = Number(inlineMatch[1]);
    }
    if(inlineIndex != undefined && options.inlinerolls && options.inlinerolls[inlineIndex]
    && options.inlinerolls[inlineIndex].results
    && options.inlinerolls[inlineIndex].results.total != undefined){
      options.modifier = options.inlinerolls[inlineIndex].results.total.toString();
    } else {
      log('Invalid Inline')
      log(options.inlinerolls);
      return whisper('Invalid Inline');
    }
  }

  switch(options.modifier.toLowerCase()){
    case 'max':
      options.modifier = attribute.max;
      break;
    case 'current':
      options.modifier = attribute.current;
      break;
  }

  var modifiedAttribute = {
    current: attribute.current,
    max: attribute.max
  };

  modifiedAttribute[options.workingWith] = numModifier.calc(
    attribute[options.workingWith],
    options.operator,
    options.sign + options.modifier
  );

  return modifiedAttribute;
}
