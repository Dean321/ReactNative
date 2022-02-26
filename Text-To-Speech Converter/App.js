import React, {Component} from "react"
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert} from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from 'react-native-elements'
import * as Speech from "expo-speech";
export default class App extends Component{
  constructor() {
    super();
    this.state = {
     text:''
    };
  }
  render(){
    return(
      <SafeAreaProvider style={styles.main}>
        <Header
            centerComponent={{
            text: 'T2S Converter',
            style: styles.header,
          }}
          containerStyle={styles.headCont}
        />
        <Image source={require("./logo.png")} style={styles.img}/>
        <TextInput
          style={styles.ti}
          multiline={true}
          onChangeText={(t) => {
            this.setState({ text: t });
          }}
          placeholder="Enter Text Here"
        />
        <TouchableOpacity style={styles.btn} onPress={()=>{
          (this.state.text==="")?(Alert.alert("Please enter some text")):(
          Speech.speak(this.state.text))
          }}>
          <Text style={styles.btnTxt}>
            Listen
          </Text>
        </TouchableOpacity>
      </SafeAreaProvider>
    )
  }
}
const styles = StyleSheet.create({
  main:{
    backgroundColor:"#949CDF",
    borderRadius:30
  },
  headCont:{
    backgroundColor: '#CD5D7D',
    justifyContent: 'space-around',
    borderTopEndRadius:30,
    borderTopStartRadius:30,
  },
  header:{
    color: '#F6ECF0',
    fontWeight: 'bold',
    fontSize: 26,
  },
  img:{
    width:250,
    height:150,
    alignSelf:"center",
    marginTop:20
  },
  ti:{
    borderRadius: 20,
    borderColor: 'black',
    width: 200,
    height: 80,
    backgroundColor: '#A7C5EB',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    fontSize:20,
    fontWeight:"bold",
    color:"#CD5D7D"
  },
  btn:{
    alignSelf:"center",
    marginTop:50,
    backgroundColor:"#F6ECF0",
    width:150,
    height:150,
    borderRadius:100,
    alignItems:"center"
  },
  btnTxt:{
    textAlign:"center",
    marginTop:50,
    fontSize:28,
    fontWeight:"bold",
    color:"#CD5D7D"
  }
})

/**
 * red - #CD5D7D
 * light - #F6ECF0
 * blue - #A7C5EB
 * purple - #949CDF
 */