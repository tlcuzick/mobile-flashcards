import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class DeckCard extends Component {
  render() {
    const { deckName, numCards } = this.props;
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
    justifyContent: "center",
    height: 75,
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  deckCardHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  deckCardCount: {
    fontSize: 15,
    color: "gray",
    textAlign: "center",
  },
});
