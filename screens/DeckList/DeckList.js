import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { connect } from 'react-redux'
import Constants from 'expo-constants';
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
            <View style={styles.deckListContainer}>
            <ScrollView>
                {deckListJSX}           
            </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = decks => {
    return {decks};
};
  
export default connect(mapStateToProps)(DeckList);


const styles = StyleSheet.create({
    deckListContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignSelf: 'center',        
        width: '80%',
        marginTop: Constants.statusBarHeight
    }
  });
