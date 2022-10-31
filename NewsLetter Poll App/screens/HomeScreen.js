import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import db from '../config';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      likes: 0,
      dislikes: 0,
    };
  }
  componentDidMount() {
    this.Update = setInterval(() => {
      this.updateState();
    }, 1000);
  }

  updateState() {
    var likes;
    db.ref('poll/like').on('value', (d) => {
      likes = d.val();
    });
    var dislikes;
    db.ref('poll/dislike').on('value', (d) => {
      dislikes = d.val();
    });
    this.setState({
      likes: likes,
      dislikes: dislikes,
    });
  }
  componentWillMount() {
    clearInterval(this.Update);
  }
  goToBuzzerScreen = (screen) => {
    this.props.navigation.navigate(screen);
  };
  updateLike() {
    var likes;
    db.ref('poll/like').on('value', (d) => {
      likes = d.val();
    });
    likes++;
    db.ref('poll').update({ like: likes });
    this.setState({ likes: likes });
  }
  updateDislike() {
    var dislikes;
    db.ref('poll/dislike').on('value', (d) => {
      dislikes = d.val();
    });
    dislikes++;
    db.ref('poll').update({ dislike: dislikes });
    this.setState({ dislikes: dislikes });
  }

  render() {
    return (
      <View style={{ backgroundColor: '#A2D2FF', flex: 1 }}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 28,
              fontFamily: 'cursive',
              fontWeight: 'bold',
              // textAlign: 'center',
              color: '#FF865E',
            }}>
            Newsletter
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => this.goToBuzzerScreen('JokeScreen')}>
              <Image
                style={styles.img}
                source={{
                  uri: 'https://images-platform.99static.com//VRGyl011qcEeRXa_cfrzF8rQDrc=/252x137:860x745/fit-in/590x590/99designs-contests-attachments/16/16576/attachment_16576991',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Jokes</Text>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => this.goToBuzzerScreen('HoroscopeScreen')}>
              <Image
                style={styles.img}
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYdZPOIr4AY0X56QotWufp2e9FuJSJML6PBw&usqp=CAU',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Horoscope</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => this.goToBuzzerScreen('WeatherScreen')}>
              <Image
                style={styles.img}
                source={{
                  uri: 'data:image/jpeg;base64,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',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Weather</Text>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => this.goToBuzzerScreen('NewsScreen')}>
              <Image
                style={styles.img}
                source={{
                  uri: 'https://i.pinimg.com/originals/fe/be/de/febede61e6bc4a70c15334d0ad9bc989.jpg',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>News</Text>
          </View>
        </View>
        <View style={{ backgroundColor: '#FEE440', marginTop: 30 }}>
          <Text style={styles.rate}>RATE US</Text>

          <View
            style={[
              styles.grid,
              { paddingLeft: '30%', paddingRight: '30%', marginBottom: 0 },
            ]}>
            <View style={styles.item}>
              <TouchableOpacity onPress={this.updateLike}>
                <Image
                  style={styles.thumbsUp}
                  source={require('../assets/thumbsUp.png')}
                />
              </TouchableOpacity>
              <Text style={styles.rtxt}>{this.state.likes}</Text>
            </View>
            <View style={styles.item}>
              <TouchableOpacity onPress={this.updateDislike}>
                <Image
                  style={styles.thumbsDown}
                  source={require('../assets/thumbsUp.png')}
                />
              </TouchableOpacity>
              <Text style={styles.rtxt}>{this.state.dislikes}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FEE440',
    paddingBottom: 0,
    paddingTop: 20,
    flex: 0.3,
    // marginTop:15
    alignItems:"center",
    justifyContent:"center"
  },
  thumbsUp: {
    width: 50,
    height: 50,
  },
  thumbsDown: {
    width: 50,
    height: 50,
    transform: [{ rotate: '180deg' }],
  },
  rate: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 15,
    flex: 0.2,
  },
  img: {
    width: 150,
    height: 150,
    borderColor: '#FEE440',
    borderWidth: 5,
  },
  grid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 0.7,
  },
  item: {
    //  position:"relative",
    //  flexDirection:"row"
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    // marginBottom:55
  },
  txt: {
    color: '#FF865E',
    fontWeight: 'bold',
    fontSize: 18,
    textDecoration: 'underline',
  },
  rtxt: {
    color: '#FF865E',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Comic',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
