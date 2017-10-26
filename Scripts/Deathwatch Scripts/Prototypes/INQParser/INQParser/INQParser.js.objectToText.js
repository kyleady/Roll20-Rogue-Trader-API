//extract the text out of an object
INQParser.prototype.objectToText = function(obj, callback){
  var parser = this;
  var toTextPromise = new Promise(function(resolve){
    switch(obj.get("_type")){
      case 'handout':
        obj.get('notes', function(notes){resolve({notes: notes});});
        break;
      case 'character':
        obj.get('bio', function(bio){resolve({notes: bio});});
        break;
    }
  });

  toTextPromise.catch(function(e){log(e)});
  toTextPromise.then(function(Notes){
    return new Promise(function(resolve){
      obj.get('gmnotes', function(gmnotes){
        Notes.gmnotes = gmnotes;
        resolve(Notes);
      });
    });
  }).then(function(Notes){
    //be sure a null result was not given
    if(Notes.notes == 'null'){
      Notes.notes = '';
    }
    if(Notes.gmnotes == 'null'){
      Notes.gmnotes = '';
    }
    //save the result
    parser.Text = Notes.notes + "<br>" + Notes.gmnotes;
    if(typeof callback == 'function') callback(parser);
  }).catch(function(e){log(e)});
}
