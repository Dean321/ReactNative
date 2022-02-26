import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import SpaceCraftScreen from './components/SpaceCraftScreen';
import StarMapScreen from './components/StarMapScreen';
import DailyPicScreen from './components/DailyPicScreen';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SpaceCraft" component={SpaceCraftScreen} />
          <Stack.Screen name="DailyPic" component={DailyPicScreen} />
          <Stack.Screen name="StarMap" component={StarMapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
