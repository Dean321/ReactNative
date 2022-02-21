import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Appcontainer />
      </View>
    );
  }
}

var TabNavigator = createBottomTabNavigator({
  Screen1: { screen: Screen1 },
  Screen2: { screen: Screen2 },
});

const Appcontainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
});
