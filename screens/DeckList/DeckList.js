import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from "react-native";
import { connect } from "react-redux";
import DeckCard from "./DeckCard";
import { handleReceiveDecks } from "../../actions/decks";

class DeckList extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
  }
  render() {
    const { navigation, decks } = this.props;
    const deckIDs = Object.keys(decks);
    const deckListJSX = deckIDs.map((deckID) => {
      const { title, cards } = decks[deckID];
      const params = {
        deckID,
        deckName: title,
        numCards: Object.keys(cards).length,
      };
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Deck", params);
          }}
          key={deckID}
        >
          <DeckCard {...params} />
        </TouchableOpacity>
      );
    });

    if (deckIDs.length > 0) {
      return (
        <View style={styles.deckListContainer}>
          <ScrollView>{deckListJSX}</ScrollView>
        </View>
      );
    }

    return (
      <View style={styles.deckListContainer}>
        <View style={styles.deckListEmpty}>
          <Text style={styles.deckListEmptyText}>
            You haven't created any decks yet.
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (decks) => {
  return { decks };
};

export default connect(mapStateToProps)(DeckList);

const styles = StyleSheet.create({
  deckListContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignSelf: "center",
    width: "80%",
  },
  deckListEmpty: {
    flex: 1,
    justifyContent: "center",
  },
  deckListEmptyText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
});
