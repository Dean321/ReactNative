import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import HomeScreen from "./screens/HomeScreen";
import HoroscopeScreen from "./screens/HoroscopeScreen";
import JokeScreen from "./screens/JokeScreen";
import NewsScreen from "./screens/NewsScreen";
import WeatherScreen from "./screens/WeatherScreen";
import { createAppContainer, createSwitchNavigator} from "react-navigation"; 

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
  
  HomeScreen: HomeScreen,
  JokeScreen: JokeScreen,
  HoroscopeScreen:HoroscopeScreen,
  WeatherScreen: WeatherScreen,
  NewsScreen: NewsScreen
})

const AppContainer = createAppContainer(AppNavigator)

const styles=StyleSheet.create({
  view: {
    backgroundColor:"turquoise",
    flex:1
  }
})