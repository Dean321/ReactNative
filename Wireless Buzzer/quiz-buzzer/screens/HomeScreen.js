import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';
import db from "../config";
export default class HomeScreen extends Component {
  constructor(){
    super();
    this.state = {
      greenStatus : true,
      orangeStatus : true,
      lightblueStatus: true,
      redStatus : true
    }
  }
  goToBuzzerScreen = (buzzercolor) => {
    this.props.navigation.navigate('BuzzerScreen', { color: buzzercolor });
  };
  componentDidMount(){
    db.ref("teams").on("value", data => {
      var teamDetails = data.val();
      this.setState({
          greenStatus : teamDetails.green.ibp,
          orangeStatus : teamDetails.orange.ibp,
          lightblueStatus: teamDetails.lightblue.ibp,
          redStatus : teamDetails.red.ibp
      })
    })
  }
  render() {
    return (
      <View>
        <AppHeader />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'green' }]}
          onPress={() => this.goToBuzzerScreen('green')} disabled={this.state.greenStatus}>
          <Text style={styles.buttonText}>Team 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => this.goToBuzzerScreen('red')} disabled={this.state.redStatus}>
          <Text style={styles.buttonText}>Team 2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'orange' }]}
          onPress={() => this.goToBuzzerScreen('orange')} disabled={this.state.orangeStatus}>
          <Text style={styles.buttonText}>Team 3</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'lightblue' }]}
          onPress={() => this.goToBuzzerScreen('lightblue')} disabled={this.state.lightblueStatus}>
          <Text style={styles.buttonText}>Team 4</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 30,
    width: 200,
    height: 50,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
