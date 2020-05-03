import { AsyncStorage } from 'react-native';

const DECKS_KEY = 'DECKS';

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(data => {
      return JSON.parse(data)
    })
}

export const getDeck = (deckID) => {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(data => {
      return JSON.parse(data)
    })
    .then(decks => {
      return decks[deckID]
    })
}

export const saveDeckTitle = (title, id) => {
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(
    {
      [id]: {
        title,
        cards: {}
      }
  }))
}

export const addCardToDeck = async (deckID, card) => {
  const {id, question, answer} = card;
  const {title} = await getDeck(deckID);
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
    [deckID] : {
      title,
      cards: {[id]: {question, answer}}
    }
  }))  
}