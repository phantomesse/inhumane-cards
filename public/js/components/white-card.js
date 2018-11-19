'use strict';

class WhiteCardComponent {
  constructor(content) {
    // Create card element.
    this._innerElement = $('<div>').addClass('inner').text(content);
    $('<div>').addClass('logo').appendTo(this._innerElement);
    this.element = $('<div>').addClass('white-card').append(this._innerElement);

    // Add checkbox.
    $('<i>').addClass('fas fa-check').appendTo(this._innerElement);

    // Add card order counter.
    // TODO: only need this for multiple picks.
    $('<div>').addClass('order-counter').text(1).appendTo(this._innerElement);

    this._handleSelect();
  }

  /** Handles selecting the card. */
  _handleSelect() {
    this._innerElement.click(function() {
      if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
      } else {
        $(this).addClass('selected');
      }
    });
  }
}
