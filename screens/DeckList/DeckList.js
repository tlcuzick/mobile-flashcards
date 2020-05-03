import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import DeckCard from './DeckCard';
import {handleReceiveDecks} from '../../actions/decks'

class DeckList extends Component {
    componentDidMount() {
        this.props.dispatch(handleReceiveDecks());
    }    
    render() {
        const {navigation, decks} = this.props;
        const deckListJSX = Object.keys(decks).map(deckID => {
            const {title, cards} = decks[deckID];
            const params = {
                deckID,
                deckName: title,
                numCards: Object.keys(cards).length
            }
            return (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Deck', params)}}
                    key={deckID}
                >
                    <DeckCard {...params} />              
                </TouchableOpacity>                
            )
        })  
        return (
            <View>
                {deckListJSX}           
            </View>
        );
    }
}

const mapStateToProps = decks => {
    return {decks};
};
  
export default connect(mapStateToProps)(DeckList);
