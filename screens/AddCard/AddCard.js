import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import {connect} from 'react-redux';
import {handleAddCard} from '../../actions/decks'

let uuid = require('react-native-uuid');      

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    handleQuestionChange = (question) => {
      this.setState({question})
    }

    handleAnswerChange = (answer) => {
        this.setState({answer})
    }  

    handleSubmit = async () => {
      const {question, answer} = this.state;
      const {deckID} = this.props.route.params;
      const card = {id: uuid(), question, answer}
      await this.props.dispatch(handleAddCard(deckID, card))
      this.setState({question: '', answer: ''});
    }

    render() {
        return (
            <View>
                <TextInput 
                  onChangeText={this.handleQuestionChange}
                  value={this.state.question}
                />
                <TextInput 
                  onChangeText={this.handleAnswerChange}
                  value={this.state.answer}
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

export default connect()(AddCard);

const styles = StyleSheet.create({
    AddCard: {
        flex: 1,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px'
    }
})

