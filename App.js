import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { decksReducer } from "./reducers/decks";
import middleware from "./middleware";
import DeckList from "./screens/DeckList/DeckList";
import Deck from "./screens/Deck/Deck";
import Quiz from "./screens/Quiz/Quiz";
import NewDeck from "./screens/NewDeck/NewDeck";
import AddCard from "./screens/AddCard/AddCard";
import { setLocalNotification } from "./utils/helpers";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DecksStackScreen = () => (
  <Stack.Navigator initialRouteName="DECKS">
    <Stack.Screen name="DECKS" component={DeckList} />
    <Stack.Screen
      name="Deck"
      component={Deck}
      options={({ route }) => ({ title: route.params.deckName })}
    />
    <Stack.Screen name="Quiz" component={Quiz} />
    <Stack.Screen name="Add Card" component={AddCard} />
  </Stack.Navigator>
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const tabStyle = {
      paddingBottom: 15,
    };
    return (
      <Provider store={createStore(decksReducer, middleware)}>
        <NavigationContainer>
          <Tab.Navigator tabBarOptions={{ style: tabStyle }}>
            <Tab.Screen name="DECKS" component={DecksStackScreen} />
            <Tab.Screen name="NEW DECK" component={NewDeck} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
