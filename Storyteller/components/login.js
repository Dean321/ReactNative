import firebase from 'firebase';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';

var fonts = {
  croissantOne: require('../assets/fonts/CroissantOne-Regular.ttf'),
};

export default class Login extends Component {
  constructor() {
    super();
    this.state = { 
      e: '', 
      p: '', 
      fl: false 
    };
  }
  async loadfonts() {
    await Font.loadAsync(fonts);
    this.setState({ fl: true });
  }
  async signin(e, p) {
    firebase
      .auth()
      .signInWithEmailAndPassword(e, p)
      .then(() => {
        this.props.navigation.replace('navigator');
      })
      .catch((i) => {
        alert(i.message);
      });
  }
  componentDidMount(){
    this.loadfonts()
  }
  render() {
    if(this.state.fl)
    return (
      <View style={s.v1}>
        <Image source={require('../assets/logo2.png')} style={s.l2} />
        <Image source={require('../assets/logo1.png')} style={s.l1} />

        <Text style={s.t1}> Login </Text>
        <TextInput
          placeholder={'Enter your email'}
          style={s.ti}
          onChangeText={(i) => {
            this.setState({ e: i });
          }}
          placeholderTextColor="#22668D"
        />
        <TextInput
          placeholder={'Enter your password'}
          style={s.ti}
          onChangeText={(i) => {
            this.setState({ p: i });
          }}
          secureTextEntry={true}
          placeholderTextColor="#22668D"
        />

        <TouchableOpacity
          onPress={() => {
            this.signin(this.state.e, this.state.p);
          }}
          style={[s.to, { backgroundColor: '#22668D', color:"#FFFADD" }]}>
          <Text style={{color:"#FFFADD", fontSize:RFValue(16)}}> Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('register');
          }}
          style={[s.to, {opacity:0.4, marginTop:1}]}>
          <Text style={{color:"#22668D", fontSize:RFValue(14)}}> Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const s = StyleSheet.create({
  t1: {
    color: '#22668D',
    fontSize: RFValue(32),
    fontFamily:"croissantOne"
  },
  v1: {
    backgroundColor: '#8ECDDD',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ti: {
    width: RFValue(200),
    height: RFValue(20),
    backgroundColor: '#FFCC70',
    paddingLeft: RFValue(10),
    marginTop: RFValue(10),
    paddingVertical:RFValue(15)
  },
  to: {
    height: RFValue(30),
    width: RFValue(100),
    marginTop: RFValue(20),
    // backgroundColor: '#FFCC70',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(15),
  },
  l1: {
    width: RFValue(220),
    height: RFValue(220),
    resizeMode: 'contain',
  },
  l2: {
    width: RFValue(200),
    height: RFValue(50),
    resizeMode: 'contain',
  },
});
