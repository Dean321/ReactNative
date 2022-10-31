import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class WeatherScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      weather: []
    };
  }

  componentDidMount() {
    fetch("https://fcc-weather-api.glitch.me/api/current?lat=18&lon=73")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            weather: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, weather } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div style={{marginTop:200, textAlign:"center"}}>Loading...</div>;
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Weather :</Text>
          <Image style = {{width:100, height:100}} source={{uri:this.state.weather.weather[0].icon}}/> 
            <Text style={{fontWeight:"bold", color:"orange"}}>{this.state.weather.weather[0].description.toUpperCase()}</Text>
          <Text style={styles.text}>Wind Speed :</Text> 
            <Text style={{fontWeight:"bold"}}>{this.state.weather.wind.speed}</Text>
          <Text style={styles.text}>Temprature :</Text> 
            <Text style={{fontWeight:"bold"}}>{this.state.weather.main.temp}</Text>
          <Text style={styles.text}>Min Temprature :</Text> 
            <Text style={{fontWeight:"bold"}}>{this.state.weather.main.temp_min}</Text>
          <Text style={styles.text}>Max Temprature :</Text>
            <Text style={{fontWeight:"bold"}}>{this.state.weather.main.temp_max}</Text>
          <Text style={styles.text}>Pressure :</Text> 
            <Text style={{fontWeight:"bold"}}>{this.state.weather.main.pressure}</Text>
          <Text style={styles.text}>Humidity :</Text> 
            <Text style={{fontWeight:"bold"}}>{this.state.weather.main.humidity}</Text>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("HomeScreen");}}>
            <Image style = {{width:100, height:100, marginTop:100}} source={{uri:"https://cdn-icons-png.flaticon.com/512/93/93634.png"}}/>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop:50,
    marginLeft:20,
    alignItems:"center",
  flex:1
  },
  text:{
    color:"blue",
    fontWeight:"bold",

  }
})