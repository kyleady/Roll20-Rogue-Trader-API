//a prototype the will parse handouts and character sheets for use by other prototypes
function INQParser(object, mainCallback){
  //the text that will be parsed
  this.Text = "";

  //allow the user to specify the object to parse in the constructor
  var parser = this;
  var parserPromise = new Promise(function(resolve){
    if(object != undefined){
      parser.objectToText(object, function(){
        resolve();
      });
    } else {
      resolve();
    }
  });

  parserPromise.catch(function(e){log(e)});
  parserPromise.then(function(){
    if(object != undefined) parser.parse();
    if(typeof mainCallback == 'function') mainCallback(parser);
  });
}
