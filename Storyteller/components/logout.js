import firebase from "firebase"
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
export default class Logout extends Component {
  componentDidMount(){firebase.auth().signOut()
  this.props.navigation.replace("login")
  }
  render() {
    return (
      <View style={s.v1}>
        <Text style={s.t1}> App </Text>
      </View>
    );
  }
}
const s = StyleSheet.create({
  t1: { color: 'red', fontSize: 32 },
  v1:{backgroundColor:"skyblue",flex:1,justifyContent:"center",alignItems:"center"}
});
