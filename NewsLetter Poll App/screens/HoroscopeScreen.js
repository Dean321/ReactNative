import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class HoroscopeScreen extends Component{
  render(){
    return(
      <View>
      <Text style={styles.t}>
        HOROSCOPE
      </Text>
       <Text style={styles.text}>
          Patterns that keep you trapped in the past are trying to change, but you might be clinging to them out of fear. Try to remove yourself from the situation emotionally and ask yourself if there’s anything there worth hanging on to, outside of nostalgia. You have the unique ability to optimize your situation right now, but you could be resisting it to hang on to something that you don't even really want. Be aware of why you’re making the choices you’re making, then decide if you still want to hold on.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    textAlign:"justify",
    flex:1,
    marginLeft:20,
    backgroundColor:"lightblue",
    fontSize:18,
    padding:10
  },
  t:{
    fontSize:20,
    fontWeight:"bold",
    color:"blue",
    textAlign:"center"
  }
})