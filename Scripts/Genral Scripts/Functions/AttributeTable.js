function attributeTable(name, attribute, options){
  if(typeof options != 'object') options = {};
  if(options['color'] == undefined) options['color'] = '00E518';
  var attrTable = '<table border = \"2\" width = \"100%\">';
  attrTable += '<caption>' + name + '</caption>';
  attrTable += '<tr bgcolor = \"' + options['color'] + '\"><th>Current</th><th>Max</th></tr>';
  attrTable += '<tr bgcolor = \"White\"><td>' + attribute.current + '</td><td>' + attribute.max + '</td></tr>';
  attrTable += '</table>';
  return attrTable;
}
