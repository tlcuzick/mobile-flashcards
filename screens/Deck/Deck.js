import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';

class Deck extends Component {
    render() {
        const {route, navigation, numCards} = this.props;
        const {deckID, deckName} = route.params
        const params = {deckID}
        return (
            <View style={styles.deck}>
                <View style={styles.deckLargeBuffer}>              
                </View>   
                <View style={styles.deckHeader}>
                  <Text style={styles.deckHeaderText}>{deckName}</Text>
                  <Text style={styles.deckHeaderCardCount}>{numCards}</Text>                  
                </View>
                <View style={styles.deckLargeBuffer}>              
                </View>                
                <View style={styles.deckButtons}>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Add Card', params)}}
                >
                    <View style={styles.deckButtonAddCard}>
                      <Text style={styles.deckButtonAddCardText}>Add Card</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Quiz', params)}}                    
                >
                    <View style={styles.deckButtonStartQuiz}>
                      <Text style={styles.deckButtonStartQuizText}>Start Quiz</Text>
                    </View>
                </TouchableOpacity>
                </View>
                <View style={styles.deckSmallBuffer}>              
                </View>                                                  
            </View>
        );
    }
}

const mapStateToProps = (state, props) => {
    const {deckID} = props.route.params;
    const deck = state[deckID];
    const numCards = deck.cards ? Object.keys(deck.cards).length : 0;
    return {numCards}
}

export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
    deck: {
        flex: 1,
        justifyContent: 'center'
    },
    deckLargeBuffer: {
        flex: 2
    },
    deckSmallBuffer: {
        flex: 1
    },    
    deckHeader: {
        flex: 2,
        justifyContent: 'space-between'
    },
    deckHeaderText: {
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    deckHeaderCardCount: {
        textAlign: 'center',
        fontSize: '20px',
        color: 'gray'
    },
    deckButtons: {
        flex: 3,
        justifyContent: 'space-between'
    },
    deckButtonStartQuiz: {
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '40%',
        height: 60,
        alignSelf: 'center',
        borderRadius: '4%'
    },
    deckButtonStartQuizText: {
        color: 'white',
        backgroundColor: 'black',
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold'
    },
    deckButtonAddCard: {
        justifyContent: 'center',
        width: '40%',
        height: 60,
        alignSelf: 'center',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'black',
        borderRadius: '4%'
    },
    deckButtonAddCardText: {
        color: 'black',
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold'
    }     
})