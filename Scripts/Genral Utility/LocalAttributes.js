function LocalAttributes(graphic) {
  this.graphic = graphic;
  this.gmnotes = decodeURIComponent(graphic.get('gmnotes'));
  this.gmnotes = this.gmnotes.replace(/<br>/g, '\n');
  this.Attributes = {};
  if(/[^\{\}]*(\{.*\})[^\{\}]*/.test(this.gmnotes)){
    this.Attributes = this.gmnotes.replace(/[^\{\}]*(\{.*\})[^\{\}]*/, '$1');
    this.Attributes = carefulParse(this.Attributes) || {};
  }

  this.get = function(attribute) {
    return this.Attributes[attribute];
  }

  this.set = function(attribute, value) {
    var newValue = this.Attributes[attribute] = value;
    this.save();
    return newValue;
  }

  this.remove = function(attribute) {
    delete this.Attributes[attribute];
    this.save();
  }

  this.save = function() {
    if(/[^\{\}]*(\{.*\})[^\{\}]*/.test(this.gmnotes)){
      this.gmnotes = this.gmnotes.replace(/[^\{\}]*(\{.*\})[^\{\}]*/, JSON.stringify(this.Attributes));
    } else {
      this.gmnotes = this.gmnotes + '<br>' + JSON.stringify(this.Attributes);
    }

    this.gmnotes = encodeURIComponent(this.gmnotes);
    this.graphic.set('gmnotes', this.gmnotes);
  }
}
