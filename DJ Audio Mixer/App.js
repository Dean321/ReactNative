import React, { Component } from 'react';
import { Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
const sound = new Audio.Sound();
export default class App extends Component {
   startSound1 = async () => {
    await sound.unloadAsync();
    await sound.loadAsync(require('./cute.mp3'));
    await sound.playAsync();
  }
  startSound2 = async () => {
    await sound.unloadAsync();
    await sound.loadAsync(require('./hipjazz.mp3'));
    await sound.playAsync();
  }
  startSound3 = async () => {
    await sound.unloadAsync();
    await sound.loadAsync(require('./onceagain.mp3'));
    await sound.playAsync();
  }
  startSound4 = async () => {
    await sound.unloadAsync();
    await sound.loadAsync(require('./pianomoment.mp3'));
    await sound.playAsync();
  }
  stopSound = async () => {
    await sound.unloadAsync();
  }
  render() {
    return (
      <View style={{backgroundColor:"#a7c4bc", flex:1, alignItems:"center", justifyContent:"center"}}>
      <Image source={require("./assets/2565018.png")} style={{width:200, height:200}}/>
        <Text style={{ fontSize: 36, textAlign: 'center', fontWeight:"bold",marginBottom:10}}>
          AUDIO MIXER
        </Text>
        <br/>
        <TouchableOpacity
            style={{
                  width: 150,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "maroon",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fed049",
                  borderRadius: 100,
            }}
            onPress={this.startSound1}>
            <Text style={{
            fontWeight: "bold",
            fontSize: 25
          }}> Cute</Text>
          </TouchableOpacity>
<br/>
  <TouchableOpacity
            style={{
                  width: 150,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "maroon",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#007580",
                  borderRadius: 100,
            }}
            onPress={this.startSound2}>
            <Text style={{
            fontWeight: "bold",
            fontSize: 25,
            color:"white"
          }}> Hip Jazz</Text>
          </TouchableOpacity>

        <br/>
         <TouchableOpacity
            style={{
                  width: 150,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "maroon",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#282846",
                  borderRadius: 100,
            }}
            onPress={this.startSound3}>
            <Text style={{
            fontWeight: "bold",
            fontSize: 23,
            color:"white"
          }}> Once Again</Text>
          </TouchableOpacity>

           <br/>
         <TouchableOpacity
            style={{
                  width: 150,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "maroon",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#d8ebe4",
                  borderRadius: 100,
            }}
            onPress={this.startSound4}>
            <Text style={{
            fontWeight: "bold",
            fontSize: 25
          }}> Piano</Text>
          </TouchableOpacity>
  <br/>
  <TouchableOpacity
            style={{
                  width: 150,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "maroon",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FF5834",
                  borderRadius: 100,
            }}
            onPress={this.stopSound}>
            <Text style={{
            fontWeight: "bold",
            fontSize: 25
          }}> Stop</Text>
          </TouchableOpacity>
          <br/>
      </View>
    );
  }
}
