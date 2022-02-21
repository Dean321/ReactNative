import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import HomeScreen from "./components/HomeScreen";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";

/**
 * createStackNavigator() function 
 */

const Stack = createStackNavigator();

export default class App extends React.Component {
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Screen1" component={Screen1}/>
        <Stack.Screen name="Screen2" component={Screen2}/>
      </Stack.Navigator>
    </NavigationContainer>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  
});
