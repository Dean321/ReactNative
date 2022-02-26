import * as React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Font from 'expo-font';
export default class StarMapScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      latitude: 28.70406,
      longitude: 77.102493,
      url: '',
    };
  }
  async loadFonts() {
    await Font.loadAsync({
      Audiowide: require('../assets/fonts/Audiowide-Regular.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    //setInterval(()=>{this.forceUpdate()}, 1000)
    this.loadFonts();

    this.Timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  tick() {
    if (this.state.longitude.length == 0) {
      this.setState({ longitude: 77.102493 });
    }
    if (this.state.latitude.length == 0) {
      this.setState({ latitude: 28.70406 });
    }
    this.setState({
      url:
        'https://virtualsky.lco.global/embed/index.html?longitude=' +
        this.state.longitude +
        '&latitude=' +
        this.state.latitude +
        '&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true',
    });
  }

  componentWillMount() {
    clearInterval(this.Timer);
  }
  render() {
    console.log(this.state);
    if (!this.state.fontsLoaded) {
      return null;
    }
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>Star Map</Text>
          <TextInput
            style={{
              backgroundColor: '#325288',
              width: 200,
              height: 30,
              borderRadius: 30,
              color: '#FAEEE7',
              marginTop: 5,
              paddingLeft: 10,
            }}
            placeholder="Enter Longitude"
            onChangeText={(t) => {
              this.setState({ longitude: t });
            }}
          />
          <TextInput
            style={{
              backgroundColor: '#325288',
              width: 200,
              height: 30,
              borderRadius: 30,
              color: '#FAEEE7',
              marginTop: 5,
              paddingLeft: 10,
            }}
            placeholder="Enter Latitude"
            onChangeText={(t) => {
              this.setState({ latitude: t });
            }}
          />
        </View>
        <WebView
          scalesPageToFit={true}
          source={{
            uri: this.state.url,
          }}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleBar: {
    // flex: 0.10,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Alfa Slab One',
    marginTop: 20,
  },
  titleText: {
    fontFamily: 'MajorMonoDisplay',
    fontSize: 32,
    color: '#325288',
    // marginTop: 10,
  },
});
