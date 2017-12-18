//if this line is a table, save it
INQParser.prototype.parseTable = function(line){
  var re = /^\s*(?:<(?:strong|em|u)>)*(.*?)(?:<(?:strong|em|u)>)*\s*<table>(.*)<\/table>\s*$/;
  var matches = line.match(re);
  if(matches){
    //finish off any in-progress lists
    this.completeOldList();
    //store the content of the tables here
    var table = [];
    //break the table into rows
    re = /<tr>(.*?)<\/tr>/g
    var rows = matches[2].match(re);
    if(rows == null){rows = [];}
    for(var i = 0; i < rows.length; i++){
      //break each row into cells, while maintaining the overall structure
      re = /<td>(.*?)<\/td>/g
      var cells = rows[i].match(re);
      if(cells == null){cells = [];}
      for(var j = 0; j < cells.length; j++){
        //trim down each cell to just the content
        cells[j] = cells[j].replace(/<\/?td>/g, "");
        //be sure a column exists for the content
        table[j] = table[j] || [];
        //save the content
        table[j][i] = cells[j];
      }
    }
    //the table has been disected, save it
    this.Tables.push({
      Name:    matches[1],
      Content: table
    });
    //the line was properly parsed
    return true;
  }
  return false;
}
