import firebase from 'firebase';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import * as Font from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';

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

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      description: '',
      story: '',
      moral: '',
      cover: require("../assets/logo1.png"),
      theme:false,
      fl:false
    };
  }
async loadfonts() {
    await Font.loadAsync(fonts);
    this.setState({ fl: true });
  }
  componentDidMount(){
  this.getuser()  
  this.loadfonts()
  }

async getuser() {
    let theme, name;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (i) => {
        theme = i.val().t == 'light' ? true : false
        this.setState({ theme: theme});
      });
  }

  addpost = async () => {
    var flag = true;
    if (
      this.state.title &&
      this.state.author &&
      this.state.description &&
      this.state.story &&
      this.state.moral &&
      this.state.cover
    ) {
      var id = Math.random().toString(36).slice(2);
      await firebase
        .database()
        .ref('posts/' + id)
        .set({
          title: this.state.title,
          author: this.state.author,
          description: this.state.description,
          story: this.state.story,
          moral: this.state.moral,
          cover: this.state.cover,
        });
    } else {
      flag = false;
      alert('fill all fields');
    }
    if (flag) {
      this.setState({
        title: '',
        author: '',
        description: '',
        story: '',
        moral: '',
        cover: require('../assets/logo1.png'),
      });
    }
  };
  render() {
    if(this.state.fl)
    return (
      <View style={[s.v1,{backgroundColor:this.state.theme?bg:dbg}]}>
       <Image source={require('../assets/logo2.png')} style={s.l2} />
        <Image source={this.state.cover} style={s.l1} />
        <Text style={[s.t1,{color:this.state.theme?bgt:dbgt}]}> Form </Text>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <TextInput
            style={[s.ti,{backgroundColor:this.state.theme?pl:dpl,color:this.state.theme?plt:dplt}]}
            placeholder={'Title'}
            onChangeText={(i) => {
              this.setState({ title: i });
            }}
            value={this.state.title}
          />
          <TextInput
            style={[s.ti,{backgroundColor:this.state.theme?pl:dpl,color:this.state.theme?plt:dplt}]}
            placeholder={'Author'}
            onChangeText={(i) => {
              this.setState({ author: i });
            }}
            value={this.state.author}
          />
          <TextInput
            style={[s.ti,{backgroundColor:this.state.theme?pl:dpl,color:this.state.theme?plt:dplt}]}
            placeholder={'Description'}
            onChangeText={(i) => {
              this.setState({ description: i });
            }}
            value={this.state.description}
          />
          <TextInput
           style={[s.ti,{backgroundColor:this.state.theme?pl:dpl,color:this.state.theme?plt:dplt,height:100}]}
            placeholder={'Story'}
            multiline={true}
            onChangeText={(i) => {
              this.setState({ story: i });
            }}
            value={this.state.story}
          />

          <TextInput
            style={[s.ti,{backgroundColor:this.state.theme?pl:dpl,color:this.state.theme?plt:dplt}]}
            placeholder={'Moral'}
            onChangeText={(i) => {
              this.setState({ moral: i });
            }}
            value={this.state.moral}
          />
          <TextInput
            style={[s.ti,{backgroundColor:this.state.theme?pl:dpl,color:this.state.theme?plt:dplt}]}
            placeholder={'Cover'}
            onChangeText={(i) => {
              this.setState({ cover: {uri:i} });

            }}
            // value={this.state.cover}
          />
          <TouchableOpacity
            style={[s.to,{backgroundColor:this.state.theme?bgt:dbgt}]}
            onPress={() => {
              this.addpost();
            }}>
            <Text style={{color:this.state.theme?bg:dbg}}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const s = StyleSheet.create({
  t1: { color: 'red', fontSize: RFValue(32), fontFamily:"croissantOne" },
  v1: {
    backgroundColor: 'skyblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ti: {
    width: RFValue(200),
    height: RFValue(20),
    backgroundColor: 'coral',
    paddingLeft: RFValue(10),
    marginBottom: RFValue(20),
  },
  to: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    width: RFValue(100),
    height: RFValue(50),
    alignSelf: 'center',
    borderRadius: RFValue(20),
    marginBottom:RFValue(100)
  },
  l1: {
    width: RFValue(220),
    height: RFValue(220),
    resizeMode: 'contain',
  },
  l2: {
    width: RFValue(200),
    height: RFValue(50),
    resizeMode: 'contain',
  },
});
