import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { handleAddDeck } from "../../actions/decks";
import { create_UUID } from "../../utils/helpers";

class NewDeck extends Component {
  state = {
    deckTitle: "",
  };

  handleChange = (deckTitle) => {
    this.setState({ deckTitle });
  };

  handleSubmit = async () => {
    if (this.state.deckTitle.length > 0) {
      const deckID = create_UUID();
      const { deckTitle } = this.state;
      await this.props.dispatch(handleAddDeck(deckTitle, deckID));
      this.setState({ deckTitle: "" }, () => {
        this.props.navigation.navigate("Deck", { deckID, deckName: deckTitle });
      });
    }
  };

  render() {
    return (
      <View style={styles.newDeck}>
        <View style={styles.newDeckHeader}>
          <Text style={styles.newDeckHeaderText}>
            What is the title of your new deck?
          </Text>
        </View>
        <View style={styles.newDeckTextInputContainer}>
          <TextInput
            style={styles.newDeckTextInput}
            onChangeText={this.handleChange}
            value={this.state.deckTitle}
          />
        </View>
        <View style={styles.newDeckButtonContainer}>
          <TouchableOpacity onPress={this.handleSubmit}>
            <View style={styles.newDeckButton}>
              <Text style={styles.newDeckButtonText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect()(NewDeck);

const styles = StyleSheet.create({
  newDeck: {
    flex: 1,
    justifyContent: "space-between",
  },
  newDeckHeader: {
    flex: 2,
    justifyContent: "center",
  },
  newDeckHeaderText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  newDeckTextInputContainer: {
    flex: 2,
    justifyContent: "center",
  },
  newDeckTextInput: {
    width: "80%",
    height: 40,
    alignSelf: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
  },
  newDeckButtonContainer: {
    flex: 2,
    justifyContent: "center",
  },
  newDeckButton: {
    justifyContent: "center",
    backgroundColor: "black",
    width: "40%",
    height: 60,
    alignSelf: "center",
    borderRadius: 4,
  },
  newDeckButtonText: {
    color: "white",
    backgroundColor: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
