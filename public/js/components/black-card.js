'use strict';

class BlackCardComponent extends AbstractCardComponent {
  constructor(content) {
    super(content);
    this.element.addClass('black');
  }
}
