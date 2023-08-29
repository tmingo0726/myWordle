function storeCurrentPlayer(player) {
    localStorage.setItem('currentPlayer', JSON.stringify(player));
  }
  
  function getCurrentPlayer() {
    const player = JSON.parse(localStorage.getItem('currentPlayer'));
    return player;
  }
  
  function clearCurrentPlayer() {
    localStorage.removeItem('currentPlayer');

  }

  function storeCurrentIngredient(ingredient) {
    localStorage.setItem('currentIngredient', JSON.stringify(ingredient));
  }

  function getCurrentIngredient() {
    const ingredient = JSON.parse(localStorage.getItem('currentIngredient'));
    return ingredient;
  }
  
  function clearCurrentIngredient() {
    localStorage.removeItem('currentIngredient');

  }

  
  function storeCurrentToken(token) {
    localStorage.setItem('currentToken', JSON.stringify(token));
  }

  function getCurrentToken() {
    const token = JSON.parse(localStorage.getItem('currentToken'));
    return token;
  }

  function clearCurrentToken() {
    localStorage.removeItem('currentToken');

  }

   
  module.exports = {
    storeCurrentToken,
    getCurrentToken,
    clearCurrentToken,
    storeCurrentPlayer,
    getCurrentPlayer,
    clearCurrentPlayer,
    storeCurrentIngredient,
    clearCurrentIngredient,
    getCurrentIngredient,
    }