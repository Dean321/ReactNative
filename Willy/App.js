import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TransactionScreen from './components/BookTransactionScreen'
import SearchScreen from './components/SearchScreen'
import LoginScreen from "./components/LoginScreen"
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Appcontainer />
      </View>
    );
  }
}

var TabNavigator = createBottomTabNavigator(
  {
    Search: { screen: SearchScreen },
    Transaction: { screen: TransactionScreen },
    // Search: { screen: SearchScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({}) => {
        const routeName = navigation.state.routeName;
        if (routeName === 'Transaction') {
          return (
            <Image
              source={require('./closed.png')}
              style={{ width: 30, height: 30 }}
            />
          );
        } else if (routeName === 'Search') {
          return (
            <Image
              source={require('./search.png')}
              style={{ width: 30, height: 30 }}
            />
          );
        }
      },
      tabBarOptions : {
        activeTintColor: '#2F5D62',
        inactiveTintColor:"#DFEEEA",
        labelStyle: {
          fontSize: 10,
        },
        style: {
          backgroundColor: '#A7C4BC',
          height:60
        }
      }
    }),
  }
)

const AppSwitchNavigator = createSwitchNavigator(
  {
    Login:{screen:LoginScreen},
    BottomTab:{screen:TabNavigator}
  },
  {initialRouteName:"Login"}
);

const Appcontainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFEEEA',
  },
});

/**
 * https://colorhunt.co/palette/68b0ab8fc0a9c8d5b9faf3dd
 */
