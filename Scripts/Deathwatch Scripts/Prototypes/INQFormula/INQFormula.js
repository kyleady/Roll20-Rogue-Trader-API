function INQFormula(text){
  this.reset();
  if(typeof text == 'string') this.parse(text);
  this.valueOf = this.toNote;
}
