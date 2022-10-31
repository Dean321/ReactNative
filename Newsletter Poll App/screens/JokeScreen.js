import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class JokeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#017CFF', alignItems:"center", justifyContent:"center" }}>
        <Image style={styles.img} source={require('../assets/joke.PNG')} />
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
  img: {
    // flex:1,
    // margin:10,
    width: '100%',
    // height: '100%',
    resizeMode: 'contain',
  },
});
