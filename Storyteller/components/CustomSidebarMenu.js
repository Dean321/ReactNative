import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export default class CustomSidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
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
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.light_theme ? '#8ECDDD' : '#4F709C',
        }}>
        <Image source={require('../assets/logo2.png')} style={styles.l2} />
        <Image
          source={require('../assets/logo1.png')}
          style={styles.sideMenuProfileIcon}></Image>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
    alignSelf: 'center',
    marginTop: RFValue(20),
    resizeMode: 'contain',
  },
  l2: {
    width: RFValue(200),
    height: RFValue(50),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: RFValue(20),
  },
});
