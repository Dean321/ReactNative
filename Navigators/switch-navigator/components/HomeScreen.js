import React, {Component} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";

export default class HomeScreen extends Component{
  render(){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
          <Text>HomeScreen</Text>
           <TouchableOpacity
          style={{width:200, height:30, borderRadius:30, backgroundColor:"lightblue", alignItems:"center", justifyContent:"center",marginTop:10}}
          onPress={() => this.props.navigation.navigate("Screen1")}>
          <Text style={{}}>Screen 1</Text>
        </TouchableOpacity>
         <TouchableOpacity
          style={{width:200, height:30, borderRadius:30, backgroundColor:"lightblue", alignItems:"center", justifyContent:"center",marginTop:10}}
          onPress={() => this.props.navigation.navigate("Screen2")}>
          <Text style={{}}>Screen 2</Text>
        </TouchableOpacity>
      </View>
    )
  }
}