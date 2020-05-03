import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';

class Quiz extends Component {
    state = {
        numAnswered: 0,
        numCorrect: 0,
        showAnswer: false
    }

    onCorrectAnswer = () => {
      this.setState((currentState) => {
          return {
              numAnswered: currentState.numAnswered + 1,
              numCorrect: currentState.numCorrect + 1,
              showAnswer: false
            }
      })
    }

    onIncorrectAnswer = () => {
        this.setState((currentState) => {
            return {
                numAnswered: currentState.numAnswered + 1,
                showAnswer: false
              }
        })
      }

      toggleAnswerDisplay = () => {
        this.setState((currentState) => {
            return {
                showAnswer: !currentState.showAnswer
              }
        })
      }

    render() {
        const {numAnswered, numCorrect, showAnswer} = this.state;
        const {questions} = this.props;
        const numQuestions = questions.length;
        const currentQuestion = numAnswered >= numQuestions ? questions[numQuestions - 1] : questions[numAnswered];
        const questionJSX = showAnswer ? (
            <View>
                <Text>{currentQuestion.answer}</Text>
                <TouchableOpacity
                    onPress={this.toggleAnswerDisplay}
                >
                    <Text>Question</Text>
                </TouchableOpacity>            
            </View>
        ) : (
            <View>
                <Text>{currentQuestion.question}</Text>
                <TouchableOpacity
                    onPress={this.toggleAnswerDisplay}
                >
                    <Text>Answer</Text>
                </TouchableOpacity>            
            </View>            
        )
        
        if(numAnswered >= numQuestions) {
            return (
                <View>
                  <Text>{`${numCorrect}/${numAnswered} correct`}</Text>
                  <Text>Quiz complete!</Text>
                </View>
            )
        }

        return (
            <View style={styles.Quiz}>
                <Text>{`${numCorrect}/${numAnswered}`}</Text>
                {questionJSX}
                <TouchableOpacity
                    onPress={this.onCorrectAnswer}
                >
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.onIncorrectAnswer}
                >
                    <Text>Incorrect</Text>
                </TouchableOpacity>                           
            </View>
        );
    }
}

const mapStateToProps = (decks, props) => {
    const {deckID} = props.route.params;
    const {cards} = decks[deckID];
    const cardsArr = Object.keys(cards).map(id => {
        return cards[id];
    });
    return {
        questions: cardsArr
    }
};
  
export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
    Quiz: {
        flex: 1,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px'
    }
})

