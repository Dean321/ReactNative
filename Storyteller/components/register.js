import firebase from 'firebase';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';

var fonts = {
  croissantOne: require('../assets/fonts/CroissantOne-Regular.ttf'),
};

export default class Register extends Component {
  constructor() {
    super();
    this.state = { fn: '', ln: '', e: '', ep: '', cp: '', fl:false };
  }
   async loadfonts() {
    await Font.loadAsync(fonts);
    this.setState({ fl: true });
  }
  registeruser(e, p, cp, fn, ln) {
    if (p == cp) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(e, p)
        .then((i) => {
          alert('user successfully registered');
          firebase
            .database()
            .ref('/users/' + i.user.uid)
            .set({ fn: fn, ln: ln, t: 'light', email: e });
          this.setState({ fn: '', ln: '', e: '', ep: '', cp: '' });
        })
        .catch((i) => {
          alert(i.message);
        });
    } else {
      alert('passwords do not match');
    }
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
        <Text style={s.t1}> Register </Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            placeholder={'First Name'}
            style={[s.ti, { width: RFValue(100), marginRight: RFValue(5) }]}
            value={this.state.fn}
            onChangeText={(i) => {
              this.setState({ fn: i });
            }}
            placeholderTextColor="#22668D"
          />
          <TextInput
            placeholder={'Last Name'}
            style={[s.ti, { width: RFValue(100) }]}
            value={this.state.ln}
            onChangeText={(i) => {
              this.setState({ ln: i });
            }}
            placeholderTextColor="#22668D"
          />
        </View>
        <TextInput
          placeholder={'Enter your Email'}
          style={s.ti}
          value={this.state.e}
          onChangeText={(i) => {
            this.setState({ e: i });
          }}
          placeholderTextColor="#22668D"
        />
        <TextInput
          placeholder={'Enter your Password'}
          secureTextEntry={true}
          style={s.ti}
          value={this.state.ep}
          onChangeText={(i) => {
            this.setState({ ep: i });
          }}
          placeholderTextColor="#22668D"
        />
        <TextInput
          placeholder={'Confirm your Password'}
          secureTextEntry={true}
          style={s.ti}
          value={this.state.cp}
          onChangeText={(i) => {
            this.setState({ cp: i });
          }}
          placeholderTextColor="#22668D"
        />
        <TouchableOpacity
          style={[s.to, { backgroundColor: '#22668D' }]}
          onPress={() => {
            this.registeruser(
              this.state.e,
              this.state.ep,
              this.state.cp,
              this.state.fn,
              this.state.ln
            );
          }}>
          <Text style={{color:"#FFFADD", fontSize:RFValue(16)}}> Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.to, { opacity:0.4, marginTop:RFValue(1) }]}
          onPress={() => {
            this.props.navigation.navigate('login');
          }}>
          <Text style={{color:"#22668D", fontSize:RFValue(14)}}> Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const s = StyleSheet.create({
  t1: { color: '#22668D', fontSize: RFValue(32), fontFamily:"croissantOne" },
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
    marginTop: RFValue(15),
    paddingLeft: RFValue(5),
  },
  to: {
    width: RFValue(100),
    height: RFValue(30),
    // backgroundColor: '#22668D',
    marginTop: RFValue(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(20),
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
