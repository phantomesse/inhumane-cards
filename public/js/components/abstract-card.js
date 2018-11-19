'use strict';

/** Abstract base class for card components. */
class AbstractCardComponent {
  constructor(content) {
    if (new.target === AbstractCardComponent) {
      throw new TypeError(
        'Cannot construct AbstractCardComponent instances directly.');
    }

    this.element = $('<div>').addClass('card');
    this.innerElement = $('<div>').addClass('inner').text(content).appendTo(
      this.element);
  }
}
