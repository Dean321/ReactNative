/**change this in package "react-native-dropdown-picker": "^4.0.4" */
import * as React from 'react';
import {View, StyleSheet,Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      previewImage: 'image_1',
      dropdownHeight: 40,
    };
  }
  render(){
   
  let preview_images = {
        image_1: "https://images-na.ssl-images-amazon.com/images/I/91beIPutSkL.jpg",
        image_2: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2016/09/13/500731-moana-poster.jpg",
        image_3: "https://i.ytimg.com/vi/O-OiQfLykiU/maxresdefault.jpg",
        image_4: "https://www.arabnews.com/sites/default/files/2021/03/23/2536216-875868474.jpg",
        image_5: "https://i.ytimg.com/vi/vSKlICmmi98/maxresdefault.jpg"
      };
  return (
    <View style={styles.container}>
       <Image
              source={{uri:preview_images[this.state.previewImage]}}
              style={styles.previewImage}></Image>
            <View style={{ height: this.state.dropdownHeight ,marginBottom:10}}>
            <DropDownPicker
              items={[
                { label: 'Image 1', value: 'image_1' },
                { label: 'Image 2', value: 'image_2' },
                { label: 'Image 3', value: 'image_3' },
                { label: 'Image 4', value: 'image_4' },
                { label: 'Image 5', value: 'image_5' },
              ]}
              defaultValue={this.state.previewImage}
              containerStyle={{
                height: 90,
                borderRadius: 20,
                padding: 20,
              }}
              onOpen={() => {
                this.setState({
                  dropdownHeight: 120
                });
              }}
              onClose={() => {
                this.setState({
                  dropdownHeight: 40
                });
              }}
              style={{ backgroundColor: '#FFB4AC' }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{ backgroundColor: '#FFB4AC' }}
              labelStyle={{
                color: '#679186',
                fontWeight:"bold"
              }}
              arrowStyle={{
                color: 'black',
              }}
              onChangeItem={(item) =>
                this.setState({
                  previewImage: item.value,
                })
              }

            />
            </View>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  previewImage: {
    width: '93%',
    height: 250,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    resizeMode: 'contain',
  },
});
