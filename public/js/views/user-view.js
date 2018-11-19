'use strict';

/** View for a user. */
class UserView extends AbstractView {
  constructor(viewController, userId, gameId) {
    super(viewController, 'user-view', 'views/user.html');
    this._userId = userId;
    this._gameId = gameId;
  }

  onLoadView() {
    const userId = this._userId;

    // Set game id and user id.
    $('.user-name').text(userId);
    $('.game-id').text(this._gameId);

    // Add user. This method will only add user if the userId is new.
    const self = this;
    $.post('/add-user', {
      'userId': userId,
      'gameId': this._gameId
    }, function(userSession) {
      // Update user name.
      $('user-name').text(userSession.userName);

      self._renderCards(userSession.whiteCardsInHand);
    });

    $.get('/game-session', {
      'gameId': this._gameId
    }, function(gameSession) {
      // Set black card.
      const blackCardElement = new BlackCardComponent(gameSession.activeBlackCard)
        .element;
      blackCardElement.insertBefore('.white-cards');
    });
  }

  _renderCards(cardContents) {
    for (const content of cardContents) {
      $('.white-cards').append(new WhiteCardComponent(content).element);
    }
  }
}
