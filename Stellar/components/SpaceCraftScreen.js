import * as React from 'react';
import { Text, View, StyleSheet, Alert, FlatList, Image } from 'react-native';
import axios from 'axios';
import * as Font from 'expo-font';
export default class SpaceCraftScreen extends React.Component {
  constructor() {
    super();
    this.state = { aircrafts: [], fontsLoaded: false };
  }
  async loadFonts() {
    await Font.loadAsync({
      SyneMono: require('../assets/fonts/SyneMono-Regular.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

    componentDidMount() {
    this.loadFonts();
    // this.Timer = setInterval(() => {
      this.getData();
    // }, 1000);
  }
  // componentWillMount() {
  //   clearInterval(this.Timer);
  // }

  getData = async () => {
    axios
      .get('https://ll.thespacedevs.com/2.0.0/config/spacecraft')
      .then((response) => {
        this.setState({ aircrafts: response.data.results });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  renderItem = ({ item }) => {
    return (
      <View style={{backgroundColor:"#DE834D", margin:10, padding:10, borderRadius:10}}>
        <Image
          source={{ uri: item.agency.image_url }}
          style={{ width: '100%', height: 200, borderRadius:20}}
        />
        <Text style={{alignSelf:"center", fontSize:18, fontWeight:"bold", color:"#781D42"}}>{item.name}</Text>
        <Text style={{alignSelf:"center", fontSize:14}}>By: {item.agency.name}</Text>
        <Text style={{textAlign:"justify"}}>{item.agency.description}</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text
            style={{ fontSize: 32, fontFamily: 'SyneMono', color: '#781D42' }}>
            Space Crafts
          </Text>
        </View>
        <View style={{ flex: 0.75 }}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.aircrafts}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0D290',
  },
});
