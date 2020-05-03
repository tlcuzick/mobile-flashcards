import {RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK} from '../actions/decks'

export const decksReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deckID]: {title: action.deckName, cards: {}}
      };
    case ADD_CARD_TO_DECK:
      const deck = state[action.deckID];
      const {id, question, answer} = action.card;
      const cards = {...deck.cards, [id]: {question, answer}}
      const modifiedDeck = {title: deck.title, cards}
      return {
        ...state,
        [action.deckID]: {...modifiedDeck}
      };

    default:
      return state;
  }
};