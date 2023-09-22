import firebase from 'firebase';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Switch, Image } from 'react-native';
import * as Font from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';

const bg = '#FFFADD';
const bgt = '#22668D';
const pl = '#FFCC70';
const plt = '#8ECDDD';

const dbg = '#213555';
const dbgt = '#E5D283';
const dpl = '#4F709C';
const dplt = '#F0F0F0';

var fonts = {
  croissantOne: require('../assets/fonts/CroissantOne-Regular.ttf'),
};

export default class Profile extends Component {
  constructor() {
    super();
    this.state = { theme: false, name: '', isEnabled: false, fl:false };
  }
  async loadfonts() {
    await Font.loadAsync(fonts);
    this.setState({ fl: true });
  }
  async getuser() {
    let theme, name;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (i) => {
        (theme = i.val().t == 'light' ? true : false),
          (name = `${i.val().fn} ${i.val().ln}`);
        this.setState({ theme: theme, name: name });
      });
  }
  componentDidMount() {
    this.getuser();
    this.loadfonts()
  }
  async toggleSwitch() {
    var a = this.state.isEnabled;
    t = a == true ? 'light' : 'dark';
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .update({ t: t });
    this.setState({ isEnabled: !a, theme: a });
  }
  render() {
    if(this.state.fl)
    return (
      <View style={[s.v1, { backgroundColor: this.state.theme ? bg : dbg }]}>
       <Image source={require('../assets/logo2.png')} style={s.l2} />
        <Text style={[s.t1, { color: this.state.theme ? bgt : dbgt }]}>
          {' '}
          Profile{' '}
        </Text>
        <Image
          source={{
            uri: 'https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg',
          }}
          style={{ width: RFValue(200), height: RFValue(200), borderRadius:RFValue(200) , margin:RFValue(25)}}
        />
        <Text style={[s.t1, { color: this.state.theme ? plt : dplt , marginBottom:RFValue(20), fontFamily:"timesNewRoman"}]}>
          {' '}
          {this.state.name}{' '}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[s.t1, { color: this.state.theme ? bgt : dbgt,fontSize:22, fontFamily:"timesNewRoman" }]}>
            Dark Theme
          </Text>
          <Switch
          style={{transform:[{scaleX:1.2},{scaleY:1.2}],marginLeft:RFValue(30), marginTop:RFValue(6)}}
            trackColor={{ false: "#055E68", true: pl }}
            thumbColor={this.state.isEnabled ? dpl :pl }
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              this.toggleSwitch();
            }}
            value={this.state.isEnabled}
          />
        </View>
      </View>
    );
  }
}
const s = StyleSheet.create({
  t1: { color: 'red', fontSize: RFValue(32), fontFamily:"croissantOne" },
  v1: {
    backgroundColor: 'skyblue',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  l2: {
    width: RFValue(200),
    height: RFValue(50),
    resizeMode: 'contain',
    margin:RFValue(50)
  },
});
