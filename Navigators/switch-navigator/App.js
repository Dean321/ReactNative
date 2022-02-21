import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator} from "react-navigation"; 


import Screen1Screen from "./components/Screen1";
import Screen2Screen from "./components/Screen2";
import HomeScreen from "./components/HomeScreen";

export default class App extends Component{

  render(){
    return(
      <View style={{flex:1}}>
      <AppContainer />
      </View>
    );
  }
}

var AppNavigator = createSwitchNavigator({
  Home:HomeScreen,
  Screen1: Screen1Screen,
  Screen2: Screen2Screen,
})

const AppContainer = createAppContainer(AppNavigator)

