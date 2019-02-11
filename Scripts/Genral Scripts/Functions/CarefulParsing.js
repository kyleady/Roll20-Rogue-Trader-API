function carefulParse(str) {
  let altered_str = str.replace(/'/g, "\"");
  try {
    return JSON.parse(altered_str);
  } catch(e) {
    setTimeout(whisper, 200, 'JSON failed to parse. See the log for details.');
    log('failed to parse');
    log(str);
    log(altered_str);
    log(e);
  }
}
