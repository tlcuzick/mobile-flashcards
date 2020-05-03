import {getDecks, saveDeckTitle, addCardToDeck} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';

const receiveDecks = decks => {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

const addDeck = (deckName, deckID) => {
    return {  
      type: ADD_DECK,
      deckName,
      deckID
    }  
  };

  const addCard = (deckID, card) => {
    return {  
      type: ADD_CARD_TO_DECK,
      deckID,
      card
    }  
  };

export const handleReceiveDecks = () => {
    return dispatch => {
      getDecks()
        .then(decks => {
          dispatch(receiveDecks(decks));
        })
    }
  }

export const handleAddDeck = (deckName, deckID) => {
  return dispatch => {
    saveDeckTitle(deckName, deckID)
      .then( val => {
        dispatch(addDeck(deckName, deckID));
      })
  }
}

export const handleAddCard = (deckID, card) => {
  return dispatch => {
    addCardToDeck(deckID, card)
      .then( val => {
        dispatch(addCard(deckID, card));
      })
  }
}

