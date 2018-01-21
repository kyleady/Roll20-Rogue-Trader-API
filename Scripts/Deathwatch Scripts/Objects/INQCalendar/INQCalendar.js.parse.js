INQCalendar.parse = function(callback) {
  var times = ['past', 'future'];
  var notes = ['notes', 'gmnotes'];
  var text = {};
  var promises = [];
  for(var time of times) {
    text[time] = {};
    for(var note of notes) {
      promises.push(
        new Promise(function(resolve) {
          var saveTheTime = time;
          var saveTheNote = note;
          INQCalendar[saveTheTime + 'Obj'].get(saveTheNote, function(str) {
            text[saveTheTime][saveTheNote] = str;
            resolve();
          });
        })
      );
    }
  }

  Promise.all(promises).catch(function(e){log(e)});
  Promise.all(promises).then(function() {
    for(var time of times) {
      INQCalendar[time] = {};
      for(var note of notes) {
        INQCalendar[time][note] = [];
        if(!text[time][note]) continue;
        var lines = text[time][note].split('<br>');
        for(var line of lines) {
          if(typeof line == 'string' && line.length > 0) {
            var matches = line.match(/^<strong>([^<>]+)<\/strong>:(.+)$/);
          } else {
            var matches = null;
          }

          if(matches) {
            INQCalendar[time][note].push({
              Date: matches[1],
              Content: [matches[2]]
            });
          } else if(INQCalendar[time][note].length) {
            var last = INQCalendar[time][note].length-1;
            INQCalendar[time][note][last].Content.push(line);
          } else {
            INQCalendar[time][note].push({
              Content: [line]
            });
          }
        }
      }
    }


    if(typeof callback == 'function') callback();
  });
}
