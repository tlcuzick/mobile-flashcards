import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import {decksReducer} from './reducers/decks'
import middleware from './middleware'
import DeckList from './screens/DeckList/DeckList';
import Deck from './screens/Deck/Deck';
import Quiz from './screens/Quiz/Quiz';
import NewDeck from './screens/NewDeck/NewDeck';
import AddCard from './screens/AddCard/AddCard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DecksStackScreen = (props) => (
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
)

export default class App extends React.Component {
  render() {
    const customStatusBar = (
      <View style={{ backgroundColor: 'purple', height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor='purple' barStyle='light-content' />
      </View>      
    );

    //console.log(this.props.state);

    return (      
      <Provider store={createStore(decksReducer, middleware)}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="DECKS" component={DecksStackScreen} />
            <Tab.Screen name="NEW DECK" component={NewDeck} />    
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
