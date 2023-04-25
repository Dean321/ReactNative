import React from 'react';
import { View, Text } from 'react-native';

export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: 'light',
    };
  }
  getTheme() {
    this.setState({ theme: this.props.navigation.state.params.theme });
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
        <Text>Main Page</Text>
      </View>
    );
  }
}
