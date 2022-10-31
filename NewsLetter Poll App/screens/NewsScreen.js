import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class NewsScreen extends Component{
   constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      weather: []
    };
  }

  componentDidMount() {
    fetch("https://api.nytimes.com/svc/topstories/v2/world.json?api-key=CK8tubi1NY0Q3A9LvTWIyDiNl4KMGcT4")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            weather: result
          });
          console.log(result.results)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render(){{
    const { error, isLoaded, weather } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div style={{marginTop:200, textAlign:"center"}}>Loading...</div>;
    } else {
      return (
        <View style={{flex:1}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("HomeScreen");}}>
            <Image style = {{width:100, height:100, marginTop:100}} source={{uri:"https://cdn-icons-png.flaticon.com/512/93/93634.png"}}/>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
}

const styles=StyleSheet.create({
  t1:{
    fontSize:20,
    color:"blue",
    textAlign:"center",
    fontWeight:"bold"
  },
  t2:{
    fontSize:18,
    width:400,
    height:800,
    backgroundColor:"lightblue",
    textAlign:"justify"
  }
})