import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import HomeScreen from "./components/HomeScreen";
import IssLocationScreen from "./components/IssLocationScreen";
import MeteorScreen from "./components/MeteorScreen";

const Stack = createStackNavigator();

export default class App extends React.Component {
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="IssLocation" component={IssLocationScreen}/>
        <Stack.Screen name="Meteor" component={MeteorScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );}
}

