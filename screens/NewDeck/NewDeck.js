import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import {connect} from 'react-redux';
import {handleAddDeck} from '../../actions/decks' 

let uuid = require('react-native-uuid');  

class NewDeck extends Component {
    state = {
        deckTitle: ''
    }

    handleChange = (deckTitle) => {
      this.setState({deckTitle})
    }

    handleSubmit = async () => {      
      await this.props.dispatch(handleAddDeck(this.state.deckTitle, uuid()));
      this.setState({deckTitle: ''});
    }

    render() {
        return (
            <View>
                <Text>What is the title of your new deck?</Text>
                <TextInput 
                  onChangeText={this.handleChange}
                  value={this.state.deckTitle}
                />
                <TouchableOpacity
                    onPress={this.handleSubmit}
                >
                    <Text>Submit</Text>
                </TouchableOpacity>            
            </View>
        );
    }
}

export default connect()(NewDeck);

const styles = StyleSheet.create({
    NewDeck: {
        flex: 1,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px'
    }
})

