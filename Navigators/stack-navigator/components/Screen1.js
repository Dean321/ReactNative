import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Screen1 extends React.Component {
  render(){
  return (
    <View style={styles.container}>
      <Text>
       Screen 1
      </Text>
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
  
});
