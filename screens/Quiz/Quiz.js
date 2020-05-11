import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
  clearLocalNotification,
  setLocalNotification,
} from "../../utils/helpers";

class Quiz extends Component {
  state = {
    numAnswered: 0,
    numCorrect: 0,
    showAnswer: false,
  };

  clearNotifications = () => {
    if (
      this.state.numAnswered > 0 &&
      this.state.numAnswered === this.props.questions.length
    ) {
      clearLocalNotification().then(setLocalNotification);
    }
  };

  onCorrectAnswer = () => {
    this.setState(
      (currentState) => {
        return {
          numAnswered: currentState.numAnswered + 1,
          numCorrect: currentState.numCorrect + 1,
          showAnswer: false,
        };
      },
      () => {
        this.clearNotifications();
      }
    );
  };

  onIncorrectAnswer = () => {
    this.setState(
      (currentState) => {
        return {
          numAnswered: currentState.numAnswered + 1,
          showAnswer: false,
        };
      },
      () => {
        this.clearNotifications();
      }
    );
  };

  toggleAnswerDisplay = () => {
    this.setState((currentState) => {
      return {
        showAnswer: !currentState.showAnswer,
      };
    });
  };

  restartQuiz = () => {
    this.setState({
      numAnswered: 0,
      numCorrect: 0,
      showAnswer: false,
    });
  };

  render() {
    const { numAnswered, numCorrect, showAnswer } = this.state;
    const { questions, navigation, route } = this.props;
    const { deckID } = route.params;
    const numQuestions = questions.length;

    let currentQuestion;

    if (numQuestions === 0) {
      currentQuestion = { question: "", answer: "" };
    } else if (numAnswered >= numQuestions) {
      currentQuestion = questions[numQuestions - 1];
    } else {
      currentQuestion = questions[numAnswered];
    }

    const questionJSX = showAnswer ? (
      <View style={styles.quizQuestionAnswer}>
        <Text style={styles.quizQuestionAnswerText}>
          {currentQuestion.answer}
        </Text>
        <TouchableOpacity onPress={this.toggleAnswerDisplay}>
          <Text style={styles.quizQuestionAnswerToggle}>Question</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.quizQuestionAnswer}>
        <Text style={styles.quizQuestionAnswerText}>
          {currentQuestion.question}
        </Text>
        <TouchableOpacity onPress={this.toggleAnswerDisplay}>
          <Text style={styles.quizQuestionAnswerToggle}>Answer</Text>
        </TouchableOpacity>
      </View>
    );

    if (numAnswered >= numQuestions) {
      const message =
        numQuestions > 0
          ? `You answered ${numCorrect} out of ${numAnswered} questions correctly.`
          : "You haven't added any questions for this quiz yet.";
      return (
        <View style={styles.quiz}>
          <View style={styles.quizBufferLarge}></View>
          <View style={styles.quizScore}>
            <Text style={styles.quizScoreText}>{message}</Text>
          </View>
          <View style={styles.quizBufferSmall}></View>
          <View style={styles.quizButtons}>
            <TouchableOpacity onPress={this.restartQuiz}>
              <View style={[styles.quizButton, styles.quizButtonBorder]}>
                <Text style={styles.quizButtonText}>Restart Quiz</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Deck", { deckID });
              }}
            >
              <View style={[styles.quizButton, { backgroundColor: "black" }]}>
                <Text style={[styles.quizButtonText, { color: "white" }]}>
                  Back To Deck
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.quizBufferSmall}></View>
        </View>
      );
    }

    return (
      <View style={styles.quiz}>
        <View style={styles.quizProgress}>
          <Text
            style={styles.quizProgressText}
          >{`${numCorrect}/${numAnswered}`}</Text>
        </View>
        <View style={styles.quizBufferLarge}></View>
        {questionJSX}
        <View style={styles.quizBufferSmall}></View>
        <View style={styles.quizButtons}>
          <TouchableOpacity onPress={this.onCorrectAnswer}>
            <View style={[styles.quizButton, { backgroundColor: "green" }]}>
              <Text style={[styles.quizButtonText, { color: "white" }]}>
                Correct
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onIncorrectAnswer}>
            <View style={[styles.quizButton, { backgroundColor: "red" }]}>
              <Text style={[styles.quizButtonText, { color: "white" }]}>
                Incorrect
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.quizBufferSmall}></View>
      </View>
    );
  }
}

const mapStateToProps = (decks, props) => {
  const { deckID } = props.route.params;
  const { cards } = decks[deckID];
  const cardsArr = Object.keys(cards).map((id) => {
    return cards[id];
  });
  return {
    questions: cardsArr,
  };
};

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  quiz: {
    flex: 1,
    justifyContent: "center",
  },
  quizProgress: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 10,
  },
  quizProgressText: {
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  quizBufferLarge: {
    flex: 2,
  },
  quizBufferSmall: {
    flex: 1,
  },
  quizQuestionAnswer: {
    flex: 3,
    justifyContent: "space-between",
  },
  quizQuestionAnswerText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  quizQuestionAnswerToggle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  quizButtons: {
    flex: 3,
    justifyContent: "space-between",
  },
  quizButton: {
    justifyContent: "center",
    width: "40%",
    height: 60,
    alignSelf: "center",
    borderRadius: 4,
  },
  quizButtonBorder: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "black",
  },
  quizButtonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  quizScore: {
    flex: 3,
    justifyContent: "space-between",
  },
  quizScoreText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
});
