'use strict';

const _USER_ID_PARAMETER_KEY = 'userId';
const _GAME_ID_PARAMETER_KEY = 'gameId';

/**
 * Controls which view to show based on the URL and updates the URL based on the
 * view shown.
 */
class ViewController {
  constructor() {
    this.currentView;

    this._setView();
  }

  /** Sets the view based on the parameters. */
  _setView() {
    const parameters = ViewController._parameters;
    if (_USER_ID_PARAMETER_KEY in parameters && _GAME_ID_PARAMETER_KEY in
      parameters) {
      this.currentView = new UserView(
        this,
        parameters[_USER_ID_PARAMETER_KEY],
        parameters[_GAME_ID_PARAMETER_KEY]);
      return;
    }
    this.currentView = new HomeView(this);
  }

  /** Returns the URL parameters as a key-value object. */
  static get _parameters() {
    const parameterList = window.location.search.substr(1).split('&')
      .map((str) => str.split('='));
    const parameterMap = {};
    for (const parameter of parameterList) {
      parameterMap[parameter[0]] = parameter[1];
    }
    return parameterMap;
  }
}
