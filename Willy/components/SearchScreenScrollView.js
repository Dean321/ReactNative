import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import db from '../config';
export default class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
      searchTxt: '',
      covers: [],
    };
  }

  componentDidMount = async () => {
     var arr = [],
      cover;
    const query = await db
      .collection('transactions')
      .orderBy('DOT', 'desc')
      .limit(10)
      .get();
    query.docs.map((d) => {
      this.setState({
          allTransactions: [...this.state.allTransactions,d.data()],
          lastVisibleTransaction:d,
        });
    });
  };

searchTransactions = async (s) => {
    var txt = s.split();
    txt = txt[0].toUpperCase();
    var st = '';
    if (txt[0] === 'B') {
      st = 'bookId';
    } else if (txt[0] === 'S') {
      st = 'studentID';
    }
    const query = await db
      .collection('transactions')
      .where(st, '==', txt)
      .get();
     query.docs.map((d) => {
        this.setState({
            allTransactions: [...this.state.allTransactions, d.data()],
            lastVisibleTransaction: d,
          });
      });
  };

   render() {
    var typeColor = 'green';
    return (
      <View style={{ flex: 1 }}>
      <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FAF3DD',
            borderRadius: 30,
            height: 30,
            margin: 10,
            padding: 5,
          }}>
          <TextInput
            style={{ width: '180%' }}
            placeholder="  Enter BookID or StudenID"
            onChangeText={(t) => {
              this.setState({ searchTxt: t });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.setState({ allTransactions: [] });
              this.searchTransactions(this.state.searchTxt);
            }}>
            <Image
              source={require('../searchIcon.png')}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {this.state.allTransactions.map((item) => {
            if (item.type == 'Return') {
              typeColor = '#68B0AB';
            } else {
              typeColor = '#8FC0A9';
            }
            return (
                <View style={[styles.svV, { backgroundColor: typeColor }]}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column' }}>
                      <Image
                        style={styles.image}
                        source={{ uri: item.cover }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginLeft: 10,
                        flex: 1,
                      }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.svT1}>Book-ID:</Text>
                        <Text style={styles.svT2}> {item.bookId}</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.svT1}>Student-ID:</Text>
                        <Text style={styles.svT2}> {item.studentID}</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.svT1}>Type:</Text>
                        <Text style={styles.svT2}> {item.type}</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.svT1}>Date:</Text>
                        <Text style={styles.svT2}>
                          {' '}
                          {'' + item.DOT.toDate()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  svV: {
    borderColor: '#FAF3DD',
    borderWidth: 2,
    margin: 10,
    padding: 10,
  },
  svT1: {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#C8D5B7',
    textShadowColor: '#585858',
    //textShadowOffset:{width: 5, height: 5},
    textShadowRadius: 5,
  },
  svT2: {
    color: '#FAF3DD',
    marginLeft: 10,
  },
  image: {
    width: 80,
    height: 120,
  },
});

