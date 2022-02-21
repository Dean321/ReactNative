import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Audio } from 'expo-av';

const sound = new Audio.Sound();

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      word: '',
      word_type: '',
      word_def: '',
      sound_url: '',
      words: [],
      cnt: 1,
    };
  }

  startSound1 = async () => {
    await Audio.Sound.createAsync(
      { uri: this.state.sound_url },
      { shouldPlay: true }
    );
  };

  reset() {
    this.setState({
      word: '',
      word_type: '',
      word_def: '',
      sound_url: '',
      words:[],
      cnt:0,
    });
    this.textInput.clear();
  }

  search = async () => {
    var w = this.state.word;
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/' + w;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var words = [],
          item,
          mean,
          def,
          cnt = 0;
        for (item in responseJson) {
          for (mean in responseJson[item].meanings) {
            for (def in responseJson[item].meanings[mean].definitions) {
              var soundUrl = '../assets/NoSound.mp3';
              if (responseJson[item].phonetics[item]) {
                soundUrl = responseJson[item].phonetics[item].audio;
              }

              w = {
                word: responseJson[item].word,
                type: responseJson[item].meanings[mean].partOfSpeech,
                sound: soundUrl,
                definition:
                  responseJson[item].meanings[mean].definitions[def].definition,
              };
              words[cnt] = w;
              cnt += 1;
            }
          }
        }
        this.setState({
          words: words,
          sound_url: soundUrl,
          word: responseJson[item].word,
          word_type: responseJson[item].meanings[mean].partOfSpeech,
          word_def:
            responseJson[item].meanings[mean].definitions[def].definition,
        });
        this.update();;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  update = async () => {
    var c = this.state.cnt;
    await this.setState({
      sound_url: this.state.words[c].sound,
      word: this.state.words[c].word,
      word_type: this.state.words[c].type,
      word_def: this.state.words[c].definition,
    });
  };


  backward = async (c) => {
    if (c > 0) {
      c -= 1;
      await this.setState({ cnt: c });
      this.update();
    }
  };
  upward = async (c) => {
    if (this.state.cnt < this.state.words.length) {
      c += 1;
      await this.setState({ cnt: c });
      this.update();
    }
  };
  render() {
    c = this.state.cnt;
    return (
      <View style={styles.main}>
        <Text style={styles.t1}>Enter the word to be searched</Text>
        <TextInput
          style={styles.ta}
          placeholder="Your Word"
          onChangeText={(w) => {
            this.setState({ word: w });
          }}
          ref={(input) => {
            this.textInput = input;
          }}
        />
        <View style={[styles.row, { alignSelf: 'center', flex: 1 }]}>
          <TouchableOpacity
            style={styles.b1}
            onPress={() => {
              this.search();
            }}>
            <Text style={styles.b1t}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.startSound1();
            }}>
            <Image source={require('../assets/sound.png')} style={styles.img} />
          </TouchableOpacity>
        </View>
        <View style={styles.ans}>
          <View style={styles.row}>
            <Text style={[styles.rt, { marginLeft: 30, color: '#E8F6EF' }]}>
              Word :{' '}
            </Text>
            <Text style={[styles.rt, { color: '#B8DFD8' }]}>
              {this.state.word}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.rt, { marginLeft: 30, color: '#E8F6EF' }]}>
              Type :{' '}
            </Text>
            <Text style={[styles.rt, { color: '#B8DFD8' }]}>
              {this.state.word_type}
            </Text>
          </View>
          <Text style={[styles.rt, { marginLeft: 30, color: '#E8F6EF' }]}>
            Definition :{' '}
          </Text>
          <Text
            style={[
              styles.rt,
              {
                color: '#B8DFD8',
                justifyContent: 'space-around',
                textAlign: 'justify',
                margin: 10,
              },
            ]}>
            {this.state.word_def}
          </Text>
        </View>
        <View style={styles.grid}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.backward(this.state.cnt);
              }}>
              <Text>⮜</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.rb}
              onPress={() => {
                this.reset();
              }}>
              <Text style={styles.rbt}>RESET</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              style={[styles.btn, { }]}
              onPress={() => {
                this.upward(this.state.cnt);
              }}>
              <Text>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#4C4C6D',
    margin: 20,
    height: 400,
    borderRadius: 30,
  },
  t1: {
    textAlign: 'center',
    color: '#B8DFD8',
    fontWeight: 'bold',
    marginTop: 10,
  },
  ta: {
    borderRadius: 20,
    width: 200,
    height: 20,
    backgroundColor: '#B8DFD8',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: '#4C4C6D',
    fontSize: 14,
    fontWeight: 'italic',
  },
  b1: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#FFE194',
    width: 100,
    borderRadius: 30,
  },
  b1t: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4C4C6D',
  },
  ans: {
    borderColor: '#FFE194',
    width: 250,
    height: 290,
    borderStyle: 'solid',
    borderWidth: 3,
    margin: 20,
    borderRadius: 30,
  },
  row: {
    flexDirection: 'row',
  },
  rt: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  img: {
    width: 22,
    height: 22,
    marginLeft: 10,
    marginTop: -5,
  },
  rb: {
    alignSelf: 'center',
    margin: 10,
    backgroundColor: '#FFE194',
    width: 100,
    height: 20,
    borderRadius: 30,
  },
  rbt: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4C4C6D',
  },
  grid: {
    marginLeft: 20,
    marginTop: 30,
    marginRight: 20,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf:"center"
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#FFE194',
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
