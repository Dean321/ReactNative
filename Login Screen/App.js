import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator} from "react-navigation"; 


import LoginScreen from "./components/login"
import SignUpScreen from "./components/signup"
import MainPage from "./components/mainpage"

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
  
  Login:LoginScreen,
  SignUp:SignUpScreen,
  MainPage:MainPage
})

const AppContainer = createAppContainer(AppNavigator)

