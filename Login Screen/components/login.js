import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Base64 } from 'js-base64';

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      data: [],
    };
  }
  checkLogin = (email, password) => {
    console.log(22, this.state);
    var data = this.state.data;
    var flag = false;
    for (var i in data) {
      if (data[i].gmail == this.state.email) {
        flag = true;
        if (Base64.decode(data[i].password) == this.state.password) {
          this.props.navigation.navigate('MainPage',{theme:data[i].current_theme});
        } else {
          alert('incorrect password');
        }
      }
    }
    if(!flag){
      alert ("record doesn't exist")
    }
  };
  componentDidMount() {
    db.ref('users').on('value', (i) => {
      this.setState({ data: i.val() });
    });
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.mainCon}>
        <View style={styles.titleBox}></View>

        <View style={{ alignSelf: 'center', marginTop: 25 }}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.txtbox}
            onChangeText={(t) => this.setState({ email: t })}
            placeholder="Enter Email Here"
            placeholderTextColor="#C8D5B9"
            //autoFocus
          />
          <TextInput
            style={styles.txtbox}
            onChangeText={(t) => this.setState({ password: t })}
            placeholder="Enter Password Here"
            placeholderTextColor="#C8D5B9"
            secureTextEntry={true}
            //autoFocus
          />
          <TouchableOpacity
            style={styles.logBtn}
            onPress={() => {
              this.checkLogin(this.state.email, this.state.password);
            }}>
            <Text style={styles.logTxt}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logBtn}
            onPress={() => {
              this.props.navigation.navigate('SignUp', {
                email: this.state.email,
                password: this.state.password,
              });
            }}>
            <Text style={styles.logTxt}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mainCon: {
    flex: 1,
    justifyContent: 'center',
  },
  titleBox: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#2F5D62',
    fontWeight: 'bold',
  },
  txtbox: {
    width: '100%',
    backgroundColor: '#68B0AB',
    height: 30,
    borderRadius: 30,
    textAlign: 'left',
    color: '#FAF3DD',
    padding: 15,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#C8D5B9',
  },
  logBtn: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#8FC0A9',
    width: 100,
    height: 25,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#68B0AB',
  },
  logTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FAF3DD',
  },
});
