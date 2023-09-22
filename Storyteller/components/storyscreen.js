import * as Speech from 'expo-speech';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';

const bg = '#FFFADD';
const bgt = '#22668D';
const pl = '#FFCC70';
const plt = '#8ECDDD';

const dbg = '#213555';
const dbgt = '#E5D283';
const dpl = '#4F709C';
const dplt = '#F0F0F0';

var fonts = {
  pm: require('../assets/fonts/PermanentMarker-Regular.ttf'),
  croissantOne: require('../assets/fonts/CroissantOne-Regular.ttf'),
};

export default class Storyscreen extends Component {
  async getuser() {
    let theme, name;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on(
        'value',
        (i) => {
          theme = i.val().t == 'light' ? true : false;
          this.setState({ theme: theme });
        },
        (i) => {
          console.log(i);
        }
      );
  }

  constructor() {
    super();
    this.state = { s: require('../assets/mute.png'), theme: false, fl: false };
  }
  async loadfonts() {
    await Font.loadAsync(fonts);
    this.setState({ fl: true });
  }
  componentDidMount() {
    setInterval(() => {
      this.getuser();
    }, 1000);
    this.getuser();
    this.loadfonts();
  }

  async play() {
    var i = this.state.s;
    var title = this.props.route.params.story.title;
    var author = this.props.route.params.story.author;
    var story = this.props.route.params.story.story;
    var moral = this.props.route.params.story.moral;
    this.setState({
      s:
        i == require('../assets/mute.png')
          ? require('../assets/volume.png')
          : require('../assets/mute.png'),
    });
    if (i == require('../assets/mute.png')) {
      Speech.speak(`${title} by ${author}`);
      Speech.speak(story);
      Speech.speak(`the moral of the story is ${moral}`);
    } else {
      Speech.stop();
    }
  }
  render() {
    window.rel;
    return (
      <ScrollView
      showsHorizontalScrollIndicator={false}
        style={[s.v1, { backgroundColor: this.state.theme ? pl : dpl }]}>
        <Text style={[s.t1, { color: this.state.theme ? plt : dplt }]}>
          {' '}
          {this.props.route.params.story.title}{' '}
        </Text>
        <Image
          source={{ uri: this.props.route.params.story.cover }}
          style={{
            width: 200,
            height: 180,
            alignSelf: 'center',
            marginTop: 10,
          }}
        />{' '}
        <View style={{ flexDirection: 'row', marginVertical: 15 }}>
          <Text
            style={[
              { justifyContent: 'space-between', fontWeight: 'bold', fontFamily:"Verdana" },
              { color: this.state.theme ? plt : dplt },
            ]}>
            by- {this.props.route.params.story.author}{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.play();
            }}>
            <Image
              source={this.state.s}
              style={{ width: 20, height: 20, marginLeft: 150 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={[s.t4, { color: this.state.theme ? plt : dplt }]}>
          {' '}
          {this.props.route.params.story.story}{' '}
        </Text>
        <View
          style={[
            {
              flexDirection: 'row',
              backgroundColor: 'pink',
              padding: 10,
              borderRadius: 20,
            },
            { backgroundColor: this.state.theme ? bg : dbg },
          ]}>
          <Text style={[s.t2, { color: this.state.theme ? bgt : dbgt }]}>
            Moral:
          </Text>
          <Text style={[s.t3, { color: this.state.theme ? bgt : dbgt }]}>
            {' '}
            {this.props.route.params.story.moral}{' '}
          </Text>
        </View>
      </ScrollView>
    );
  }
}
const s = StyleSheet.create({
  t1: { color: 'red', fontSize: 32, textAlign: 'center', fontFamily:"croissantOne" },
  v1: {
    backgroundColor: 'skyblue',
    flex: 1,
    // justifyContent:"center",
    // alignItems:"center"
    padding: 15,
  },
  t2: { fontSize: 20, fontFamily:"croissantOne" },
  t3: { fontSize: 18, fontFamily:"croissantOne" },
  t4: { textAlign: 'justify', fontFamily:"timesNewRoman" , marginBottom:20},
});
