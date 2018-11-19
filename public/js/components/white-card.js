'use strict';

class WhiteCardComponent extends AbstractCardComponent {
  constructor(content) {
    super(content);
    $('<div>').addClass('logo').appendTo(this.innerElement);
    this.element.addClass('white');
  }
}
