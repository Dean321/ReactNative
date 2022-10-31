import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class HoroscopeScreen extends Component{
  render(){
    return(
      <View style={{ flex: 1, backgroundColor: '#BAD1C2', alignItems:"center", justifyContent:"center" }}>
      <Text style={styles.t}>
        HOROSCOPE
      </Text>
       <Text style={styles.text}>
          Patterns that keep you trapped in the past are trying to change, but you might be clinging to them out of fear. Try to remove yourself from the situation emotionally and ask yourself if there’s anything there worth hanging on to, outside of nostalgia. You have the unique ability to optimize your situation right now, but you could be resisting it to hang on to something that you don't even really want. Be aware of why you’re making the choices you’re making, then decide if you still want to hold on.
        </Text>
         <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('HomeScreen');
          }}>
          <Image
            style={{
              width: 50,
              height: 50, 
              //marginTop: 100
            }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    textAlign:"justify",
    flex:1,
    margin:20,
    backgroundColor:"#4FA095",
    fontSize:18,
    padding:10
  },
  t:{
    fontSize:20,
    fontWeight:"bold",
    color:"#153462",
    textAlign:"center",
    marginTop:10
  }
})