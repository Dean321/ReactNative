import React, {Component} from "react";
import {Text, View, TouchableOpacity, StyleSheet, Image} from "react-native";
import db from "../config"
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
export default class Summary extends Component{
    constructor() {
    super();
    this.state = {
      absent: [],
      present: [],
      fontsLoaded:false,
    };
  }
  async loadFonts() {
    await Font.loadAsync({
      Akaya: require('../assets/fonts/AkayaTelivigala-Regular.ttf'),
      Cabin: require('../assets/fonts/CabinSketch-Bold.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }
   componentDidMount() {
    this.loadFonts();
  }
  showTeamRanks = () => {
    var info, p, a;
    p = [];
    a = [];
    var date = new Date();
    date = date.getDate() + "-" + ( date.getMonth() + 1) + "-" + date.getFullYear();
    db.ref('attendance').on('value', (d) => {
      info = d.val();
    }, ()=>{console.log("Failed to read DB");})
    for(var i in info){
      if(info[i]!=null){
        if(info[i].[date]=="absent"){
          a.push(info[i].name)
        }
        if(info[i].[date] == "present"){
          p.push(info[i].name)
        }
      }
    }
    this.setState({absent:a, present:p})
  };

  componentDidMount() {
    this.showTeamRanks();
  }
  render(){
    return(
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
              // backgroundColor:"black"
            }}
          />
        </View>
        <View style={[styles.p, {backgroundColor:"#59886B"}]}>
          {this.state.present.map(item => {
              return <Text style={[styles.text]}>
                          {item.toUpperCase()}
                        </Text>
            })}
        </View>
         <View style={[styles.p, {backgroundColor:"#C05555"}]}>
          {this.state.absent.map(item => {
              return <Text style={[styles.text]}>
                          {item.toUpperCase()}
                        </Text>
            })}
        </View>
      </View>
    )
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
  p:{
    width:RFValue(200),
    alignSelf:"center"
  }
})