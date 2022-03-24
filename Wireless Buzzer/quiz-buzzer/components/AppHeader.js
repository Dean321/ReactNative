import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class AppHeader extends Component{
  render(){
    return(
      <View>
          <Text style={styles.title}>
           QUIZ BUZZER APP
          </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title:{ 
        fontSize: 30, 
        marginLeft: 10,
        marginRight:10, 
        marginTop: 30, 
        fontWeight:"bold",
        border:"solid",
        justifyContent:"center",
        backgroundColor:"cadetblue",
        paddingLeft:15,
        textAlign:"center"
  } 
});

export default AppHeader;