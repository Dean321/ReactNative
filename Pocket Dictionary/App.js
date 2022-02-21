import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { Header } from 'react-native-elements';
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider style={styles.mainView}>
        <Header
          centerComponent={{
            text: 'POCKET DICTIONARY',
            style: { 
                  color: '#4C4C6D', 
                  fontWeight: 'bold', 
                  fontSize: 18 
                },
          }}
          containerStyle = {{
            backgroundColor: '#FFE194',
            justifyContent: 'space-around',
            
          }}
        />
        <HomeScreen/>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor:'#B8DFD8',
    height: 500,
    width: 330,
    borderRadius:30,
    margin:10
  },
});

