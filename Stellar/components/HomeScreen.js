import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
    };
  }
  async loadFonts() {
    await Font.loadAsync({
      Bungee: require('../assets/fonts/Bungee-Regular.ttf'),
      Frijole: require('../assets/fonts/Frijole-Regular.ttf'),
      IrishGrover: require('../assets/fonts/IrishGrover-Regular.ttf'),
      LibreBarcode: require('../assets/fonts/LibreBarcode39ExtendedText-Regular.ttf'),
      Macondo: require('../assets/fonts/MacondoSwashCaps-Regular.ttf'),
      MajorMonoDisplay: require('../assets/fonts/MajorMonoDisplay-Regular.ttf'),
      Nosifer: require('../assets/fonts/Nosifer-Regular.ttf'),
      SyneMono: require('../assets/fonts/SyneMono-Regular.ttf'),
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
        <ImageBackground
          source={require('../assets/galaxyWallpaper.png')}
          style={styles.backgroundImage}>
          <View style={styles.titleBar}>
            <Image
              source={require('../assets/catAstronaut.png')}
              style={styles.catAstronaut}
            />
            <Text style={styles.titleText}>STELLAR</Text>
          </View>
          <View style={styles.btnContainer}>
            <View style={styles.btnView}>
            <Image
                source={require('../assets/airCraft.png')}
                style={{
                  width: 150,
                  height: 180,
                  // left: 210,
                  transform: [{ rotate: '310deg' }],
                  position: 'absolute',
                  resizeMode: 'contain',
                  flex: 1,
                  // bottom:-32
                }}
              />
              <TouchableOpacity style={styles.btnTo} onPress={() => {
            this.props.navigation.navigate('SpaceCraft');
          }}>
                <Text style={styles.btnTxt}>Space Craft</Text>
              </TouchableOpacity>
              
            </View>
            <View style={styles.btnView}>
            <Image
                source={require('../assets/starMap.png')}
                style={{
                  width: 130,
                  height: 130,
                  // left: 200,
                  // top:5,
                  transform: [{ rotate: '310deg' }],
                  position: 'absolute',
                  resizeMode: 'contain',
                  flex: 1,
                  // bottom:-40
                }}
              />
              <TouchableOpacity style={styles.btnTo}  onPress={() => {
            this.props.navigation.navigate('StarMap');
          }}>
                <Text style={styles.btnTxt}>Star Map</Text>
              </TouchableOpacity>
              
            </View>
            <View style={styles.btnView}>
            <Image
                source={require('../assets/earth.gif')}
                style={{
                  width: 150,
                  height: 150,
                  // left: 90,
                  // top:64,
                  // right:43,
                  transform: [{ rotate: '310deg' }],
                  position: 'absolute',
                  resizeMode: 'contain',
                  flex: 1,
                }}
              />
              <TouchableOpacity style={styles.btnTo} onPress={() => {
            this.props.navigation.navigate('DailyPic');
          }}>
                <Text style={styles.btnTxt}>Daily Pics</Text>
              </TouchableOpacity>
              
            </View>
          </View>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  titleBar: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Alfa Slab One',
    marginTop: 70,
  },
  titleText: {
    fontFamily: 'LibreBarcode',
    fontSize: 54,
    color: '#FAEEE7',
    marginTop: 10,
  },
  catAstronaut: {
    width: 100,
    height: 100,
  },
  btnContainer: {
    marginTop: 40,
    padding: 40,
   
    // backgroundColor: 'red',
  },
  btnView: {
    //backgroundColor: 'blue',
    flexDirection: 'row',
    width: '100%',
    marginTop: 30,
     alignItems: 'center',
    justifyContent: 'center',
    // padding:10
  },
  btnTo: {
    backgroundColor: '#FFCCD2',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
    width: '100%',
  },
  btnTxt: {
    fontSize: 32,
    fontFamily: 'Bungee',
  },
});
