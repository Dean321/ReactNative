import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeScreen from "./Screens/HomeScreen"
import Summary from "./Screens/Summary"
export default class App extends Component {
  render() {
    return (
        <AppContainer />
    );
  }
}

var AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  Summary: Summary
})

const AppContainer = createAppContainer(AppNavigator)



