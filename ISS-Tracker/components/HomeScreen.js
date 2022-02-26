import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import * as Font from 'expo-font';
import IssLocationScreen from './IssLocationScreen';
import MeteorScreen from './MeteorScreen';
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
    };
  }
  async loadFonts() {
    await Font.loadAsync({
      AlfaSlabOne: require('../assets/fonts/AlfaSlabOne-Regular.ttf'),
      LuckiestGuy: require('../assets/fonts/LuckiestGuy-Regular.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          source={require('../assets/wallpaper.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>ISS - Tracker</Text>
          </View>

          <TouchableOpacity
            style={styles.routeCard}
            onPress={() => {
              this.props.navigation.navigate('IssLocation');
            }}>
            <Text style={styles.routeText}>ISS Location</Text>
            <Text style={styles.knowMore}>{'Know more ➛'} </Text>
            <Text style={styles.bgDigit}>1</Text>
            <Image
              source={require('../assets/iss_icon.png')}
              style={[styles.iconImage, { width: 180, height: 120, top: -70 }]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.routeCard}
            onPress={() => {
              this.props.navigation.navigate('Meteor');
            }}>
            <Text style={styles.routeText}>Meteor</Text>
            <Text style={styles.knowMore}>{'Know more ➛'} </Text>
            <Text style={styles.bgDigit}>2</Text>
            <Image
              source={require('../assets/meteor_Icon.png')}
              style={[styles.iconImage, { width: 180, height: 220, top: -130 }]}
            />
          </TouchableOpacity>
          <View style={styles.vto}></View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleBar: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Alfa Slab One',
  },
  titleText: {
    fontFamily: 'LuckiestGuy',
    fontSize: 45,
    color: '#EF2F88',
  },
  routeCard: {
    flex: 0.25,
    marginLeft: 30,
    marginTop: 50,
    marginRight: 30,
    borderRadius: 30,
    backgroundColor: '#F9D371',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeText: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'AlfaSlabOne',
    color: '#8843F2',
    textShadowColor: '#EA99D5',
    textShadowRadius: 5,
    textShadowOffset: { width: 10, height: 10 },
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  iconImage: {
    position: 'absolute',
    // height:120,
    // width:180,
    resizeMode: 'contain',
    right: 20,
    // top:-70
  },
  knowMore: {
    paddingLeft: 30,
    color: '#F47340',
    fontSize: 15,
  },
  bgDigit: {
    position: 'absolute',
    color: '#F0BB62',
    fontSize: 150,
    right: 20,
    bottom: -15,
    zIndex: -1,
  },
});
/**https://colorhunt.co/palette/f9d371f47340ef2f888843f2 */
