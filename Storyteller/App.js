import {createStackNavigator} from "@react-navigation/stack"
import Register from "./components/register"
import Login from "./components/login"
import firebase from 'firebase';
import * as React from 'react';
import { firebaseConfig } from './config';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './components/drawernavigator';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const Stack=createStackNavigator()
const StackNavigator=()=>{return(
<Stack.Navigator initialRouteName="login" screenOptions={{headerShown:false}}>
<Stack.Screen name="login" component={Login}/>
<Stack.Screen name="register" component={Register}/>
<Stack.Screen name="navigator" component={DrawerNavigator}/>
</Stack.Navigator>  
)}
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
