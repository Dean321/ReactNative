import React, { Component } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import db from "../config";
import firebase from "firebase"
const sound = new Audio.Sound();

class SoundButton extends Component{
  startSound = async () => {
    await sound.loadAsync(require('../assets/Buzzer.mp3'));
    await sound.playAsync();
  }
  stopSound = async () => {
    await sound.unloadAsync();
  }
  isButtonPressed(buttonColor){
    var ts =firebase.database.ServerValue.TIMESTAMP; //new Date().toISOString();
    console.log("ts => ",ts)
    var team = db.ref("teams/"+buttonColor+"/");
    team.update({
      "ibp":true,
      "ts":ts
    })
  }
  render() {
    return (
      <View>
        <TouchableOpacity style={[styles.button, {backgroundColor:this.props.color}]} onPress={()=>{
          var buttonColor = this.props.color
          this.isButtonPressed(buttonColor)
          this.startSound()
        }}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
        marginLeft:50,
        marginTop:50,
        width:200,
        height:200,
        backgroundColor:"red",
        borderRadius:200,
        borderColor: "blue",
        alignItems:"center",
        justifyContent:"center" 
  },
  buttonText:{
        fontSize:35, 
        fontWeight:"bold", 
        color:"white" 
  }
});

export default SoundButton;