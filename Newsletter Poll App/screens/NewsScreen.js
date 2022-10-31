import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      weather: [],
    };
  }

  componentDidMount() {
    fetch(
      'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=CK8tubi1NY0Q3A9LvTWIyDiNl4KMGcT4'
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            weather: result,
          });
          console.log(result.results);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  render() {
    {
      const { error, isLoaded, weather } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return (
          <div style={{ marginTop: 200, textAlign: 'center' }}>Loading...</div>
        );
      } else {
        return (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#BAD1C2" }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 22,
                textAlign: 'center',
                margin: 10,
              }}>
              Black Adam takes top spot at box office again, mints over 250
              million dollars worldwide
            </Text>
            <ScrollView>
            <Image source={{uri:"https://images.indianexpress.com/2022/10/Black-Adam-ap-1200by667.jpeg"}} style={{width:"100%", height:200, resizeMode:"center", alignSelf:"center"}}/>
            <Text style={styles.text}>
              Black Adam, the Dwayne Johnson-fronted DC superhero film, kept its
              hold on the No. 1 spot at the North American box office in its
              second weekend in theaters. Down 59% from its launch, and facing
              little new competition, Black Adam added $27.7 million in ticket
              sales, bringing its domestic total to $111.1 million, according to
              studio estimates Sunday. Johnson spent a decade trying to bring
              the character to the big screen and has visions for follow-ups
              involving Superman. But the future of Black Adam is not written
              quite yet, though it’s earned $250 million worldwide. The Warner
              Bros. film carried a hefty price tag of $200 million, not
              including marketing and promotion costs, and a sequel has not been
              officially greenlit. But big changes are afoot at DC—the studio
              just announced a new leadership team of Peter Safran and James
              Gunn, whose love for propping up little-known comic book
              characters is well-documented. And on Sunday, Johnson posted a
              note to his 344 million Instagram followers about the end of the
              world press tour, thanking those who worked behind the scenes to
              launch “our NEW DC FRANCHISE known as BLACK ADAM.”
            </Text>
            
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('HomeScreen');
              }}
              style={{alignSelf:"center"}}
              >
              <Image
                style={{ width: 100, height: 100}}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png',
                }}
              />
            </TouchableOpacity>
            </ScrollView>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'justify',
    flex: 1,
    margin: 20,
    backgroundColor: '#4FA095',
    fontSize: 18,
    padding: 10,
  },
});
