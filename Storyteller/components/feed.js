import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
// let stories = require('../stories.json');
var fonts = {
  pm: require('../assets/fonts/PermanentMarker-Regular.ttf'),
  croissantOne: require('../assets/fonts/CroissantOne-Regular.ttf'),
};

const bg = '#FFFADD';
const bgt = '#22668D';
const pl = '#FFCC70';
const plt = '#8ECDDD';

const dbg = '#213555';
const dbgt = '#E5D283';
const dpl = '#4F709C';
const dplt = '#F0F0F0';

export default class Feed extends Component {
  constructor() {
    super();
    this.state = { fl: false, stories: [], theme: false };
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

  async loadfonts() {
    await Font.loadAsync(fonts);
    this.setState({ fl: true });
  }
  async fetchstories() {
    var s = [];
    await firebase
      .database()
      .ref('/posts/')
      .on(
        'value',
        (d) => {
          if (d.val()) {
            Object.keys(d.val()).forEach((a) => {
              s.push(d.val()[a]);
            });
          }
        },
        (p) => {
          console.log(25, p);
        }
      );
    this.setState({ stories: s });
  }
  componentDidMount() {
    this.loadfonts();
    setInterval(this.fetchstories(), 500);
    this.getuser();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[s.card, { backgroundColor: this.state.theme ? plt : dplt }]}
        onPress={() => {
          this.props.navigation.navigate('storyscreen', { story: item });
        }}>
        <Text style={[s.title, { color: this.state.theme ? pl : dpl }]}>
          {item.title}
        </Text>
        <Image
          source={{ uri: item.cover }}
          style={{
            width: RFValue(250),
            height: RFValue(250),
            resizeMode: 'contain',
          }}
        />
        <Text style={[s.author, { color: this.state.theme ? pl : dpl }]}>
          {item.author}
        </Text>
        <Text style={[s.description, { color: this.state.theme ? pl : dpl }]}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    if (!this.state.fl) {
      return <AppLoading />;
    } else {
      return (
        <View style={[s.v1, { backgroundColor: this.state.theme ? bg : dbg }]}>
          <Image source={require('../assets/logo2.png')} style={s.l2} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            keyExtractor={this.keyExtractor}
            data={this.state.stories}
            renderItem={this.renderItem}
          />
        </View>
      );
    }
  }
}
const s = StyleSheet.create({
  t1: {
    color: 'red',
    fontSize: RFValue(38),
    alignSelf: 'center',
    fontFamily: 'pm',
  },
  v1: {
    backgroundColor: 'skyblue',
    flex: 1,
  },
  card: {
    backgroundColor: 'pink',
    margin: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
    padding: RFValue(20),
    borderRadius: RFValue(20),
  },
  title: {
    marginBottom: RFValue(1),
    fontSize: RFValue(16),
    fontFamily: 'croissantOne',
  },
  author: { marginTop: RFValue(1), fontSize: RFValue(14), fontWeight: 'bold' },
  description: { marginTop: RFValue(10) },
  l2: {
    width: RFValue(200),
    height: RFValue(50),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: RFValue(10),
  },
});
