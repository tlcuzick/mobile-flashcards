import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

class DeckCard extends Component {
    render() {
        const { deckName, numCards} = this.props;
        return (
            <View style={styles.deckCard}>
                <Text style={styles.deckCardHeader}>{deckName}</Text>
                <Text style={styles.deckCardCount}>{numCards}</Text>                
            </View>
        );
    }
}

export default DeckCard;


const styles = StyleSheet.create({
    deckCard: {
        justifyContent: 'center',
        height: 75,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px'
    },
    deckCardHeader: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'center'
    },
    deckCardCount: {
        fontSize: '15px',
        color: 'gray',
        textAlign: 'center'
    }    
})

