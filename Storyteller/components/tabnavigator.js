import React from 'react';
import Feed from './feed';
import Form from './form';
import firebase from 'firebase';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';

var fonts = {
  croissantOne: require('../assets/fonts/CroissantOne-Regular.ttf'),
};

const Tab = createMaterialBottomTabNavigator();

class TabNavigator extends React.Component {
  constructor() {
    super();
    this.state = { theme: false };
  }
  async getuser() {
    let theme, name;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (i) => {
        theme = i.val().t == 'light' ? true : false;
        this.setState({ theme: theme });
      });
  }
  componentDidMount(){
    this.getuser()
  }
  render() {
    // if(this.state.fl)
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={[styles.mbtn,{backgroundColor: this.state.theme?"#FFCC70":"#4F709C"}]}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            var icon;
            if (route.name == 'Feed') {
              icon = focused ? 'book' : 'book-outline';
            } else {
              icon = focused ? 'create' : 'create-outline';
            }
            return (
              <Ionicons
                name={icon}
                size={RFValue(25)}
                color={color}
                style={{ width: RFValue(25), height: RFValue(25) }}
              />
            );
          },
        })}
        activeTintColor={'red'}
        inactiveTintColor={'grey'}>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Form" component={Form} />
      </Tab.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  mbtn: {
    backgroundColor: 'pink',
    height: '10%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    overflow: 'hidden',
  },
});

export default TabNavigator;
