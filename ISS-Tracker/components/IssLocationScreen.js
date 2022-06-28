import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
export default class IssLocationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      location: {},
    };
  }

  componentDidMount() {
    this.Timer = setInterval(() => {
      this.getIssLocation();
    }, 1000);
  }


  componentWillMount() {
    clearInterval(this.Timer);
  }

  getIssLocation = () => {
    axios
      .get('https://api.wheretheiss.at/v1/satellites/25544')
      .then((response) => {
        this.setState({ location: response.data });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    if (Object.keys(this.state.location).length === 0) {
      return(
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
          <Text>Loading ... </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea}>
            <ImageBackground
              source={require('../assets/ilBackground.jpg')}
              style={styles.backgroundImage}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>ISS Location</Text>
              </View>
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  region={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                    latitudeDelta: 100,
                    longitudeDelta: 100,
                  }}
                >
                <Marker
                  coordinate={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                  }}>
                  <Image
                    source={require('../assets/iss_icon.png')}
                    style={{ height: 15, width: 15 }}
                  />
                </Marker>
              </MapView>
              </View>
              <View style={{backgroundColor:"#24A19C", margin:20, borderRadius:25, padding:20, flexDirection:"column", flex:0.3,opacity:0.8}}>
                <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                  <Text style={{fontWeight:"bold", fontSize:20, color:"#D96098"}}>Latitude: </Text>
                  <Text style={{fontSize:18, color:"#325288"}}>{this.state.location.latitude}</Text>
                </View>
                <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                  <Text style={{fontWeight:"bold", fontSize:20, color:"#D96098"}}>Longitude: </Text>
                  <Text style={{fontSize:18, color:"#325288"}}>{this.state.location.longitude}</Text>
                </View>
                <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                  <Text style={{fontWeight:"bold", fontSize:20, color:"#D96098"}}>Altitude (KM): </Text>
                  <Text style={{fontSize:18, color:"#325288"}}>{this.state.location.altitude}</Text>
                </View>
                <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                  <Text style={{fontWeight:"bold", fontSize:20, color:"#D96098"}}>Velocity (KM/H): </Text>
                  <Text style={{fontSize:18, color:"#325288"}}>{this.state.location.velocity}</Text>
                </View>
              </View>
            </ImageBackground>
          </SafeAreaView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FAEEE7',
  },
  mapContainer: {
    flex: 0.6,
    margin: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

/**https://colorhunt.co/palette/24a19cfaeee7325288d96098 */
