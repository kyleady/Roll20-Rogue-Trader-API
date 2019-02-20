INQParser.prototype.parse = function(){
  //empty out any old content
  this.Tables = [];
  this.Rules  = [];
  this.Lists  = [];
  this.Misc   = [];

  //break the text up by lines
  this.Text = this.Text.replace(/(<[^>]+)\s+style[^>]+(?=\s*>)/g, (match, p1) => p1);
  this.Text = this.Text.replace(/&{1}nbsp;/g, ' ');
  this.Text = this.Text.replace(/<\/?\s*span[^>]*>/g, '');
  let Lines = this.Text.split(/(?:\n|<\/?(?:br|p|ul|div|li)(?:| [^>]+)>)/);
  Lines = this.balanceTags(Lines);
  for(var i = 0; i < Lines.length; i++) {
    if(/<hr>/.test(Lines[i])) break;
    this.parseLine(Lines[i]);
  }
  //finish off any in-progress lists
  this.completeOldList();
}
