import React from 'react';
import { View, Text, Image } from 'react-native';

export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: 'light',
      pimg:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      fn:"",
      ln:""
    };
  }
  getTheme() {
    this.setState({ theme: this.props.navigation.state.params.theme,
    pimg: this.props.navigation.state.params.pimg,
    fn: this.props.navigation.state.params.fn,
    ln:this.props.navigation.state.params.ln
      });
  }
  componentDidMount(){
    this.getTheme()
  }
  render() {
    // console.log(this.props.navigation.state.params.theme)
    return (
      <View
        style={[{
          // backgroundColor: 'lightblue',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },{backgroundColor:this.state.theme=="dark"?"grey":"white"}]}>
        <Text>Profile Page</Text>
        <Image source={{uri:this.state.pimg}} style={{width:200, height:200}}/>
        <View style={{flexDirection:"row"}}>
        <Text>{this.state.fn+"\t"}</Text>
        <Text>{this.state.ln}</Text>
        </View>
      </View>
    );
  }
}
