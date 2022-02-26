import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import db from './localdb';
import PhonicSoundButton from './PhonicSoundButton';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }
  render() {
    return (
      <SafeAreaProvider style={styles.mainView}>
        <Header
          centerComponent={{
            text: 'MONKEY CHUNKY',
            style: styles.header,
          }}
          containerStyle={styles.headCont}
        />
        <Image source={require('./assets/monkey.png')} style={styles.img} />
        <TextInput
          style={styles.ti}
          maxLength={10}
          multiline={true}
          secureTextEntry={false}
          onChangeText={(t) => {
            this.setState({ text: t });
          }}
          placeholder="Name"
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            var word = this.state.text.toLowerCase().trim();
            console.log('word ', word, this.state.text);
            db[word]
              ? this.setState({ chunks: db[word].chunks, phonicSounds: db[word].phones })
              : (alert('Word does not exist in locala database.'),
                console.log('X ', this.state.text));
          }}>
          <Text style={styles.txt}>Sumbit</Text>
        </TouchableOpacity>
        <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton
                wordChunk={item}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={1}
              />
            );
          })}
        </View>
      </SafeAreaProvider>
    );
  }
  showMsg = () => {
    return <Text>Hello {this.state.displayText}</Text>;
  };
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#5AA897',
    height: 600,
    width: 330,
    margin: 10,
    borderRadius: 30,
  },
  btn: {
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
    border: 'solid',
    width: 100,
    backgroundColor: '#F8A488',
    borderColor: '#F8A488',
  },
  img: {
    alignSelf: 'center',
    marginTop: 20,
    width: 100,
    height: 120,
  },
  ti: {
    borderRadius: 20,
    borderColor: 'black',
    width: 200,
    height: 20,
    backgroundColor: '#F8A488',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  txt: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#45526C',
  },
  header: {
    color: '#F8F5F1',
    fontWeight: 'bold',
    fontSize: 20,
  },
  headCont: {
    backgroundColor: '#45526C',
    justifyContent: 'space-around',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
});

/**
 * white => #F8F5F1
 * orange => #F8A488
 * teal => #5AA897
 * blue => #45526C
 */
