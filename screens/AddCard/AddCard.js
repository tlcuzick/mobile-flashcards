import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { handleAddCard } from "../../actions/decks";
import { create_UUID } from "../../utils/helpers";

class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  handleQuestionChange = (question) => {
    this.setState({ question });
  };

  handleAnswerChange = (answer) => {
    this.setState({ answer });
  };

  handleSubmit = async () => {
    const { question, answer } = this.state;
    if (question.length > 0 && answer.length > 0) {
      const { deckID } = this.props.route.params;
      const card = { id: create_UUID(), question, answer };
      await this.props.dispatch(handleAddCard(deckID, card));
      this.setState({ question: "", answer: "" }, () => {
        this.props.navigation.navigate("Deck", { deckID });
      });
    }
  };

  render() {
    return (
      <View style={styles.addCard}>
        <View style={styles.addCardBuffer}></View>
        <View style={styles.addCardInputContainer}>
          <TextInput
            placeholder="Enter question"
            style={styles.addCardTextInput}
            onChangeText={this.handleQuestionChange}
            value={this.state.question}
          />
          <TextInput
            placeholder="Enter answer"
            style={styles.addCardTextInput}
            onChangeText={this.handleAnswerChange}
            value={this.state.answer}
          />
        </View>
        <View style={styles.addCardButtonContainer}>
          <TouchableOpacity onPress={this.handleSubmit}>
            <View style={styles.addCardButton}>
              <Text style={styles.addCardButtonText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect()(AddCard);

const styles = StyleSheet.create({
  addCard: {
    flex: 1,
    justifyContent: "space-between",
  },
  addCardBuffer: {
    flex: 1,
  },
  addCardInputContainer: {
    flex: 3,
    justifyContent: "space-around",
  },
  addCardTextInput: {
    width: "80%",
    height: 40,
    alignSelf: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
  },
  addCardButtonContainer: {
    flex: 2,
    justifyContent: "center",
  },
  addCardButton: {
    justifyContent: "center",
    backgroundColor: "black",
    width: "40%",
    height: 60,
    alignSelf: "center",
    borderRadius: 4,
  },
  addCardButtonText: {
    color: "white",
    backgroundColor: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
