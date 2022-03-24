import React, { Component } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from "./screens/HomeScreen";
import BuzzerScreen from "./screens/BuzzerScreen";
import { createAppContainer, createSwitchNavigator} from "react-navigation";
import db from './config';

export default class App extends Component {
 
  render() {
    return (
      <View style={styles.view}>
        <AppContainer />
      </View>
    );
  }
}

var AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  BuzzerScreen: BuzzerScreen
})

const AppContainer = createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'turquoise',
    height: 450,
    flex: 1,
  }
});
