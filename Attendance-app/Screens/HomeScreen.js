import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import db from '../config';
import * as Font from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';
class Abutton extends Component {
  constructor() {
    super();
    this.state = {
      pbtn: 'none',
      abtn: 'none',
      fontsLoaded: false,
    };
  }
  async loadFonts() {
    await Font.loadAsync({
      Akaya: require('../assets/fonts/AkayaTelivigala-Regular.ttf'),
      Cabin: require('../assets/fonts/CabinSketch-Bold.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }
  present = () => {
    this.setState({ pbtn: '#A3DDCB', abtn: 'none' });
  };
  absent = () => {
    this.setState({ pbtn: 'none', abtn: '#E5707E' });
  };
  updateDB(status) {
    var info, i;
    db.ref('attendance').on(
      'value',
      (d) => {
        info = d.val();
      },
      () => {
        console.log('Failed');
      }
    );
    console.log('info = > ', info, typeof info);
    for (i in info) {
      if (info[i] != null) {
        if (info[i].name == this.props.name) {
          var date = new Date();
          date =
            date.getDate() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getFullYear();
          console.log(info[i].name, info[i].rno, date, status, info[i]);
          db.ref('attendance/' + i + '/').update({ [date]: status });
        }
      }
    }
  }
  goToSummaryScreen = (screen) => {
    this.props.navigation.navigate(screen);
  };
  componentDidMount() {
    this.loadFonts();
  }
  render() {
    console.log(this.state.pbtn, this.state.abtn)
    return (
      <View style={styles.btnView}>
        <Text style={styles.btnName}>{this.props.name}</Text>
        <TouchableOpacity style={[styles.toP, {borderTopLeftRadius:RFValue(10), borderBottomLeftRadius:RFValue(10),backgroundColor: this.state.pbtn}]}
        onPress={() => {
            this.present();
            this.updateDB('present');
          }}
        >
          <Text style={styles.toPTxt}>Present</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toP, {borderTopRightRadius:RFValue(10), borderBottomRightRadius:RFValue(10),backgroundColor: this.state.abtn}]}
           onPress={() => {
            this.absent();
            this.updateDB('absent');
          }}
        >
          <Text style={styles.toPTxt}>Absent</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.view}>
        <View
          style={{
            padding: 10,
          }}>
          <Text style={styles.text}>STONEWALL ELEMENTARY</Text>
          <Image
            source={require('../assets/logo.png')}
            style={{
              width: RFValue(200),
              height: RFValue(130),
              resizeMode: 'contain',
              alignSelf:"center",
            }}
          />
        </View>
        <View style={{}}>
          <Abutton name="Sam" />
          <Abutton name="Dean" />
          <Abutton name="Chip" />
          <Abutton name="Lana" />
          <Abutton name="Jane" />
          <Abutton name="John" />
          <Abutton name="Jack" />
          <Abutton name="Cara" />
          <Abutton name="Luke" />
          <Abutton name="Gwen" />
          <TouchableOpacity
            style={styles.btnS}
            onPress={() => {
              this.props.navigation.navigate('Summary');
            }}>
            <Text style={styles.btnTxt}>Summary</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#36622B',
    margin: RFValue(10),
    widt: '100%',
    height: '100%',
  },
  text: {
    fontSize: RFValue(32),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F9F9F9',
    fontFamily: 'Cabin',
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: RFValue(10),
    color:"#FFFFFF"
  },
  btnS: {
    width: RFValue(80),
    height: RFValue(30),
    borderRadius: RFValue(30),
    alignSelf: 'center',
    backgroundColor: '#E6B566',
    alignItems:"center",
    justifyContent:"center"
  },
  btnView: {
    flexDirection: 'row',
    marginLeft: RFValue(20),
    marginRight: RFValue(20),
    width: '80%',
    marginBottom: RFValue(10),
    alignItems: 'center',
    height:RFValue(30),
    padding:RFValue(5),
    alignSelf:"center"
  },
  btnName: {
    width: RFValue(200),
    fontFamily:"Akaya",
    fontSize:RFValue(26),
    color:"#E8E9A1"
  },
  toP: { 
    width: RFValue(60),
    height:RFValue(30),
    justifyContent:"center",
    alignItems:"center",
    borderColor:"#E6B566",
    borderWidth:1, 
  },
  toPTxt: {
    color:"#F7F7F7"
  },
});
