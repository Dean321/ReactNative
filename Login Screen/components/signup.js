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
  Switch,
} from 'react-native';
import db from '../config';
import { Base64 } from 'js-base64';

export default class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      fn: '',
      ln: '',
      pimg: '',
      theme: false,
      cn: '',
      rc: 0,
    };
  }

  checkLogin = async () => {
    console.log(22, this.state);
    if (
      this.state.email &&
      this.state.password &&
      this.state.cn &&
      this.state.fn &&
      this.state.ln &&
      this.state.pimg
    ) {
      if (this.state.password == this.state.cn) {
        this.setState({ rc: this.state.rc + 1 });

        var rc = this.state.rc;

        var theme = this.state.theme ? 'dark' : 'light';
        await db.ref('users/' + rc + '/').update({
          current_theme: theme,
          first_name: this.state.fn,
          gmail: this.state.email,
          last_name: this.state.ln,
          profile_picture: this.state.pimg,
          password: Base64.encode(this.state.password),
        });

        this.props.navigation.navigate('MainPage');
      } else {
        alert('Passwords do not match');
      }
    } else {
      alert('Fill all of the fields');
    }
  };

  readProps = async () => {
    var n = 0;

    await db.ref('users').once('value', function (snapshot) {
      n = snapshot.numChildren();
    });

    await this.setState({
      email: this.props.navigation.state.params.email,
      password: this.props.navigation.state.params.password,
      rc: n,
    });
  };

  componentDidMount() {
    this.readProps();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.mainCon}>
        <View style={styles.titleBox}></View>
        <Text style={styles.title}>Sign Up</Text>
        <View style={{ alignSelf: 'center', marginTop: 25 }}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={[
                styles.txtbox,
                { width: 110, marginRight: 10, marginBottom: 10 },
              ]}
              onChangeText={(t) => this.setState({ fn: t })}
              placeholder="First Name"
              placeholderTextColor="#C8D5B9"
              value={this.state.fn}
              //autoFocus
            />
            <TextInput
              style={[styles.txtbox, { width: 110 }]}
              onChangeText={(t) => this.setState({ ln: t })}
              placeholder="Last Name"
              placeholderTextColor="#C8D5B9"
              value={this.state.ln}
              //autoFocus
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: '#68B0AB',
                fontWeight: 'bold',
                marginRight: 90,
                marginLeft: 10,
              }}>
              {this.state.theme ? 'Dark' : 'Light'} Theme
            </Text>
            <Switch
              trackColor={{ true: '#282A3A', false: '#D5CEA3' }}
              thumbColor={!this.state.theme ? 'black' : 'grey'}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                this.setState({ theme: !this.state.theme });
              }}
              value={this.state.theme}
            />
          </View>
          <TextInput
            style={styles.txtbox}
            onChangeText={(t) => this.setState({ email: t })}
            placeholder="Enter Email"
            placeholderTextColor="#C8D5B9"
            value={this.state.email}
            //autoFocus
          />
          <TextInput
            style={styles.txtbox}
            onChangeText={(t) => this.setState({ password: t })}
            placeholder="Enter Password"
            placeholderTextColor="#C8D5B9"
            secureTextEntry={true}
            value={this.password}
            //autoFocus
          />
          <TextInput
            style={styles.txtbox}
            onChangeText={(t) => this.setState({ cn: t })}
            placeholder="Confirm Password"
            placeholderTextColor="#C8D5B9"
            secureTextEntry={true}
            value={this.password}
            //autoFocus
          />

          <TextInput
            style={styles.txtbox}
            onChangeText={(t) => this.setState({ pimg: t })}
            placeholder="Profile Pic Url"
            placeholderTextColor="#C8D5B9"
            value={this.state.pimg}
            //autoFocus
          />
          <TouchableOpacity
            style={styles.logBtn}
            onPress={() => {
              this.checkLogin();
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
