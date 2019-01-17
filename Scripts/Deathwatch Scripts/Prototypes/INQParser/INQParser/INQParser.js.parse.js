INQParser.prototype.parse = function(){
  //empty out any old content
  this.Tables = [];
  this.Rules  = [];
  this.Lists  = [];
  this.Misc   = [];

  //break the text up by lines
  this.Text = this.Text.replace(/\s*style\s*=\s*"background-color:\s*rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)\s*"/g, '');
  var Lines = this.Text.split(/(?:<br>|\n|<\/?p>|<\/?ul>|<\/?div>|<\/?li>)/);
  Lines = this.balanceTags(Lines);
  for(var i = 0; i < Lines.length; i++) {
    if(/<hr>/.test(Lines[i])) break;
    this.parseLine(Lines[i]);
  }
  //finish off any in-progress lists
  this.completeOldList();
}
