import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import db from './config';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      joey: 0,
      chandler: 0,
      ross: 0,
      rachel: 0,
      phoebe: 0,
      monica: 0,
    };
  }
  updateDB = async (name) => {
    var key = '';
    if (name == 'joey') {
      key = 'joey';
    } else if (name == 'chandler') {
      key = 'chandler';
    } else if (name == 'ross') {
      key = 'ross';
    } else if (name == 'rachel') {
      key = 'rachel';
    } else if (name == 'phoebe') {
      key = 'phoebe';
    } else if (name == 'monica') {
      key = 'monica';
    }
    await db.ref('friendsPoll/').update({ [key]: (this.state.[key] += 1) });
  };
  getVal = async () => {
    var a;
    await db.ref('friendsPoll/').on(
      'value',
      (d) => {
        a = d.val();
      },
      () => {
        console.log('Error reaading DB');
      }
    );
    await this.setState({
      joey: a.joey,
      chandler: a.chandler,
      ross: a.ross,
      rachel: a.rachel,
      phoebe: a.phoebe,
      monica: a.monica,
    });
  };
  componentDidMount(){
    //setInterval(()=>{this.forceUpdate()}, 1000)
    this.Timer = setInterval(()=>{this.getVal()}, 1000)
  }


  componentWillMount(){
    clearInterval(this.Timer)
  }
  render() {
    return (
      <View style={{ backgroundColor: 'black', flex:1 }}>
        <Image
          style={{ width: 300, height: 60, alignSelf: 'center', marginTop: 20, resizeMode:"contain" }}
          source={{
            uri: 'https://images.tbs.com/tbs/$dyna_params/https%3A%2F%2Fi.cdn.tbs.com%2Fassets%2Fimages%2F2019%2F08%2FFriends-Logo-900x153.png',
          }}
        />
        <Text style={styles.title}>DROP YOUR VOTES</Text>
        <View style={styles.grid}>
          <View style={styles.item}>
            <TouchableOpacity style={styles.item} onPress={()=>{this.updateDB("monica")}}>
              <Image
                style={styles.img}
                source={{
                  uri: 'https://c.tenor.com/udqVYiSTszkAAAAM/yas-yes.gif',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Monica - {this.state.monica}</Text>
          </View>
          <View style={styles.item}>
            <TouchableOpacity style={styles.item} onPress={()=>{this.updateDB("chandler")}}>
              <Image
                style={styles.img}
                source={{
                  uri: 'https://media4.giphy.com/media/f5voQIM2GP1tkAT8J6/giphy.gif',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Chandler - {this.state.chandler}</Text>
          </View>
        </View>
        <View style={styles.grid}>
          <View style={styles.item}>
            <TouchableOpacity style={styles.item} onPress={()=>{this.updateDB("rachel")}}>
              <Image
                style={styles.img}
                source={{
                  uri: 'https://media3.giphy.com/media/UTMSRlRUffN505yQYn/source.gif',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Rachel - {this.state.rachel}</Text>
          </View>
          <View style={styles.item}>
            <TouchableOpacity style={styles.item} onPress={()=>{this.updateDB("ross")}}>
              <Image
                style={styles.img}
                source={{
                  uri: 'https://i.pinimg.com/originals/39/9b/a9/399ba99f3861c9657549f647d400f4cf.gif',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Ross - {this.state.ross}</Text>
          </View>
        </View>
        <View style={styles.grid}>
          <View style={styles.item}>
            <TouchableOpacity style={styles.item} onPress={()=>{this.updateDB("phoebe")}}>
              <Image
                style={styles.img}
                source={{
                  uri: 'https://c.tenor.com/bSTRKlBRQMsAAAAC/friends-laugh.gif',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Phoebe - {this.state.phoebe}</Text>
          </View>
          <View style={styles.item}>
            <TouchableOpacity style={styles.item} onPress={()=>{this.updateDB("joey")}}>
              <Image
                style={styles.img}
                source={{
                  uri: 'https://i.pinimg.com/originals/40/98/31/409831dfb50f27ff8c4052d16f39f3fd.gif',
                }}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Joey - {this.state.joey}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#F0A500',
  },
  img: {
    width: 150,
    height: 150,
    borderColor: '#39A6A3',
    borderWidth: 5,
  },
  grid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // padding:20
  },
  item: {
    //  position:"relative",
    //  flexDirection:"row"
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
  },
  txt: {
    color: '#F0A500',
    textAlign: 'center',
    fontFamily: 'cursive',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
