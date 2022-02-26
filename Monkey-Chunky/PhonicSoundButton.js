import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
export default class PhonicSoundButton extends Component {
  constructor() {
    super();
    this.state = {
      pressedButtonIndex: 0,
    };
  }
  playSound = async (soundChunk) => {
    var soundLink =
      'https://s3-whitehatjrcontent.whjr.online/phones/' +
      soundChunk.toUpperCase() +
      '.mp3';
    console.log(soundLink);
    await Audio.Sound.createAsync(
      {
        uri: soundLink,
      },
      {
        shouldPlay: true,
      }
    );
  };
  render() {
    return (
      <TouchableOpacity
        style={
          this.props.buttonIndex === this.state.pressedButtonIndex
            ? [styles.phonemes, { backgroundColor: '#45526C' }]
            : [styles.phonemes, { backgroundColor: '#F8F5F1' }]
        }
        onPress={() => {
          this.playSound(this.props.soundChunk);
          this.setState({ pressedButtonIndex: this.props.buttonIndex });
        }}>
        <Text
          style={
            this.props.buttonIndex === this.state.pressedButtonIndex
              ? [styles.ctxt, { color: '#F8F5F1' }]
              : [styles.ctxt, { color: '#45526C' }]
          }>
          {this.props.wordChunk}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  ctxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5AA897',
    textAlign: 'center',
  },
  phonemes: {
    backgroundColor: '#45526C',
    width: 50,
    height: 20,
    marginTop: 5,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});

/**
 *  color: '#F8F5F1',
 * backgroundColor: '#45526C',
 */
