
import React, { Component } from 'react';
import Tabnavigator from "./tabnavigator"
import Storyscreen from "./storyscreen"
import {createStackNavigator} from "@react-navigation/stack"

const StackNavigator = () => {
    return(
    <Stack.Navigator initialRouteName = "home" screenOptions = {{headerShown: false}}>
    <Stack.Screen name = "home" component = {Tabnavigator}/>
    <Stack.Screen name = "storyscreen" component = {Storyscreen}/>
    </Stack.Navigator>  
    )
}

export default StackNavigator

