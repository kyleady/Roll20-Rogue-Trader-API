//parse out the movement of the character
//assumes movement will be in the form of a table and in a specific order
INQCharacterParser.prototype.parseMovement = function(){
  var Movement = {};
  //search the parsed tables for movement
  _.each(this.Content.Tables, function(table){
    //be sure the name doesn't exist or that it's about movement
    if(/Move/i.test(table.Name) || table.Name == ""){
      _.each(table.Content, function(column){
        //be sure the column is the expected length of 2. Label + value
        if(column.length == 2){
          //trim out any bold tags
          column[0] = column[0].replace(/<\/?(?:strong|em)>/g, "");
          Movement[column[0]] = column[1];
        }
      });
    }
  });
  this.Movement = Movement;
}
