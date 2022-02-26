import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Linking,
} from 'react-native';
import axios from 'axios';
const YOUR_API_KEY = ""; //Put your API key here
export default class DailyPicScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apod: {},
    };
  }

  componentDidMount() {
    this.getMeteors();
  }

  getMeteors = () => {
    axios
      .get(
        'https://api.nasa.gov/planetary/apod?api_key='+YOUR_API_KEY
      )
      .then((response) => {
        this.setState({ apod: response.data });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
 
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          source={require('../assets/dailyPicWallpaper.jpg')}
          style={styles.backgroundImage}>
          <View
            style={{
              backgroundColor: '#181D31',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
            }}>
            <Text style={styles.routeText}>Astronomy picture of the day</Text>
          </View>
          <Text style={styles.titleText}>{this.state.apod.title}</Text>
         
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => {
                Linking.openURL(this.state.apod.url).catch((e) =>
                  Alert.alert("Couldn't Load page ", e)
                );
              }}>
              <Image
                source={require('../assets/giphy.gif')}
                style={{ width: 150, height: 150, alignSelf: 'center' }}
              />
            </TouchableOpacity>
         
          <Text style={styles.explanationText}>
            {this.state.apod.explanation}
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  routeText: {
    color: '#E6DDC4',
    fontSize: 22,
    alignSelf: 'center',

    justifyContent: 'center',
  },
  titleText: {
    color: '#F0E9D2',
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
  },
  explanationText: {
    backgroundColor: '#181D31',
    margin: 10,
    alignSelf: 'center',
    padding: 15,
    color: '#E6DDC4',
    textAlign: 'justify',
    borderColor: '#F0E9D2',
    borderWidth: 3,
    // fontWeight:"bold"
  },
});

/**https://colorhunt.co/palette/f0e9d2e6ddc4678983181d31 */
