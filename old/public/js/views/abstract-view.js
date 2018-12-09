'use strict';

/** Abstract base class for views. */
class AbstractView {
  constructor(viewController, className, templateFileName) {
    if (new.target === AbstractView) {
      throw new TypeError(
        'Cannot construct AbstractView instances directly.');
    }

    this.viewController = viewController;
    const self = this;
    this.element = $('main').empty().load(templateFileName, function() {
      self.onLoadView();
    });

    $('body').removeClass().addClass(className);
  }

  onLoadView() {}
}
