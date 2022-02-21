import React, {Component} from "react";
import {Text, View, StyleSheet, Button} from "react-native";

export default class Screen1 extends Component{
  render(){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"pink"}}>
          <Text>Screen 1</Text>
      </View>
    )
  }
}