import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {
  render(){
  return (
    <View style={styles.container}>
      <Text>
        HomeScreen </Text>
        <TouchableOpacity
            style={styles.routeCard}
            onPress={() => {
              this.props.navigation.navigate('Screen1');
            }}>
            <Text>Screen 1</Text>           
          </TouchableOpacity>
     <TouchableOpacity
            style={styles.routeCard}
            onPress={() => {
              this.props.navigation.navigate('Screen2');
            }}>
            <Text>Screen 2</Text>           
          </TouchableOpacity>
    </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    alignItems:"center",
  },
  routeCard:{
    backgroundColor:"lightblue",
    width:200,
    height:30,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:30,
    marginTop:10,
  }
  
});
