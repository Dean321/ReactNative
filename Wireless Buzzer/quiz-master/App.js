import React, { Component } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import db from './config';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      teamsRank: []
    };
  }
  showTeamRanks = () => {
    var teams = [];
    db.ref('teams/').on('value', (d) => {
      var itemList = d.val();
      //console.log('itemList => ', itemList);
      for (var team in itemList) {
        if (itemList[team]['ibp'] == true) {
          teams.push([team, itemList[team].ts]);
        }
      }
      //console.log('teams => ', teams);
      teams.sort(function (t1, t2) {
        console.log('t1 = > ', t1[1]);
        var dateA = new Date(t1[1]),
          dateB = new Date(t2[1]);
        return dateA - dateB;
      });
     // console.log('Sorted teams => ', teams);
      this.setState({ teamsRank: teams });
      teams=[]
    });
  };

  componentDidMount() {
    this.showTeamRanks();
  }
  resetDB(){
    db.ref("teams/").update({
      "green":{
        "ibp":false,
        "ts":0
      },
       "lightblue":{
        "ibp":false,
        "ts":0
      },
       "orange":{
        "ibp":false,
        "ts":0
      },
       "red":{
        "ibp":false,
        "ts":0
      }
    })
  }
  render() {
    return (
        <View style={styles.view}>
        <View style={{marginTop:100}}>
        <Text style={styles.btnTxt}>PLAYERS PLAY </Text>
            {this.state.teamsRank.map(item => {
              if (item[0] == 'orange') color = '#F2CD5C';
    else if (item[0] == 'red') color = '#E96479';
    else if (item[0] == 'green') color = '#7DB9B6';
    else color = 'lightblue';
              return <View style = {styles.textView}>
                        <Text style={[styles.text,{backgroundColor:color }]}>
                          {item[0].toUpperCase()}
                        </Text>
                      </View>;
            })}
          <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTxt} onPress={this.resetDB}>
                  REPLAY
              </Text>
          </TouchableOpacity>
      </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
   backgroundColor:"#F5E9CF",
    height: 350,
    flex: 1,
    // marginLeft:10,
    // marginTop:10,
    // width:300
    alignItems:"center",
    // justifyContent:"center"
  },
  text:{
    fontSize:20,
    color:"black",
    fontWeight:"bold",
    border:"solid",
    width:150,
    textAlign:"center",
    marginTop:10,
    height:35
  },
  textView:{
    alignItems:"center",
    backgroundColor:"#F5E9CF",
    width:300
  },
  btn:{
    width: 100,
    height: 30,
    marginTop:20,
    backgroundColor:"#F94A29",
    borderRadius:30,
    alignSelf:"center",
    color:"#FCE000"

    // marginLeft:100
  },
  btnTxt:{
    textAlign:"center",
    fontSize:22,
    fontWeight:"bold",
  }
});
