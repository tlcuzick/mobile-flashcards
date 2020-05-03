import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

class DeckCard extends Component {
    render() {
        const {deckID, deckName, numCards} = this.props;
        const routeParams = {deckID, deckName, numCards}
        return (
            <View>
                <Text>{deckName}</Text>
                <Text>{numCards}</Text>                
            </View>
        );
    }
}

export default DeckCard;


const styles = StyleSheet.create({
    deckCard: {
        flex: 1,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px'
    }
})

