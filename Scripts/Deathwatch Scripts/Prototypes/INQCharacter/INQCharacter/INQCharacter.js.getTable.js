INQCharacter.prototype.getTable = function(rows, boldFirstRow){
  var output = '';
  if(boldFirstRow || boldFirstRow == undefined){
    for(var i = 0; i < rows[0].length; i++) {
      rows[0][i] = '<strong>' + rows[0][i] + '</strong>';
    }
  }

  output += '<table><tbody>';
  for(var row of rows){
    output += '<tr>';
    for(var element of row){
      output += '<td>';
      output += element;
      output += '</td>';
    }

    output += '</tr>';
  }

  output += '</tbody></table>';
  return output;
}
