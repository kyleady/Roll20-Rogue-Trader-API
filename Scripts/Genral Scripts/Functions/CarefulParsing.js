function carefulParse(str) {
  var obj = undefined;
  try {
    return JSON.parse(str);
  } catch(e) {
    setTimeout(whisper, 200, 'JSON failed to parse. See the log for details.');
    log('failed to parse');
    log(str);
    log(e);
  }
}
