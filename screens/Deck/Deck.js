import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Deck extends Component {
    render() {
        const {route, navigation} = this.props;
        const {deckID, deckName, numCards} = route.params
        const params = {deckID}
        return (
            <View style={styles.deck}>
                <Text>{deckName}</Text>
                <Text>{numCards}</Text>
                <TouchableOpacity
                    style={styles.buttonAddCard}
                    onPress={() => {navigation.navigate('Add Card', params)}}
                >
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStartQuiz}
                    onPress={() => {navigation.navigate('Quiz', params)}}                    
                >
                    <Text>Start Quiz</Text>
                </TouchableOpacity>                                              
            </View>
        );
    }
}

export default Deck;

const styles = StyleSheet.create({
    deck: {
        flex: 1,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px'
    },
    buttonAddCard: {
        color: 'black'
    },
    buttonStartQuiz: {
        color: 'white'
    }
})