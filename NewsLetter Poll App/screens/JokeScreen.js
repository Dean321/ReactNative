import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class JokeScreen extends Component{
  render(){
    return(
      <View style={{flex:1, backgroundColor:"#017CFF"}}>

      <Image style={styles.img} source={require("../assets/joke.PNG")}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img:{
    // flex:1,
    // margin:10,
    width:"100%",
    height:"100%",
    resizeMode:"contain"
  }
})