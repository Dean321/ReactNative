import Logout from './logout';
import StackNavigator from './stack';
import React from 'react';

import Profile from './profile';

import { createDrawerNavigator } from '@react-navigation/drawer';

import firebase from 'firebase';

import CustomSidebarMenu from './CustomSidebarMenu';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: false,
    };
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
  componentDidMount() {
    this.getuser();
  }

  render() {
    let props = this.props;
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
        screenOptions={{
          // headerShown: false,
          headerStyle: {
            height: 30, // Specify the height of your custom header
            backgroundColor:this.state.theme?"#FFFADD":"#213555",
           
          },
          drawerActiveTintColor: '#213555',
          drawerActiveBackgroundColor: '#FFFADD',
          drawerInactiveTintColor: '#213555',
          itemStyle: { marginVertical: 5 },
        }}
        useLegacyImplementation>
        <Drawer.Screen
          name="MyHome"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  }
}
