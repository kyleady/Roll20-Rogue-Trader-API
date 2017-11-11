INQParser.prototype.parse = function(){
  //empty out any old content
  this.Tables = [];
  this.Rules  = [];
  this.Lists  = [];
  this.Misc   = [];

  //break the text up by lines
  var Lines = this.Text.split(/(?:<br>|\n|<\/?ul>|<\/?div>|<\/?li>)/);
  Lines = this.balanceTags(Lines);
  for(var i = 0; i < Lines.length; i++){
    this.parseLine(Lines[i]);
  }
  //finish off any in-progress lists
  this.completeOldList();
}
