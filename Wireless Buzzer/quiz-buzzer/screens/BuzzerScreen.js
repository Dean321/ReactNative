import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from  "react-native";
import AppHeader from "../components/AppHeader";
import SoundButton from "../components/SoundButton";

export default class HomeScreen extends Component{
  render(){
    return(
      <View style={{flex:1}}>
        <AppHeader />
        <SoundButton color={this.props.navigation.getParam('color')}/>
      </View>
    )
  }
}
