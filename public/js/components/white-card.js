'use strict';

class WhiteCardComponent {
  constructor(content) {
    // Create card element.
    this._innerElement = $('<div>').addClass('inner').text(content);
    $('<div>').addClass('logo').appendTo(this._innerElement);
    this.element = $('<div>').addClass('white-card').append(this._innerElement);
  }
}
