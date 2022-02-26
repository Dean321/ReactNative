import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from 'firebase';
import db from '../config';

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
      scannedBookId: '',
      scannedStudentId: '',
      transactionType: '',
      bookAvailability: '',
      inc_val: 0,
    };
  }

  getCameraPermissions = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //console.log("status => ",status, id);
    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: id,
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    //console.log("barcode => ",data, this.state.buttonState)
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal',
    });
    if (this.state.buttonState === 'BookId') {
      this.setState({ scannedBookId: data });
    } else {
      this.setState({ scannedStudentId: data });
    }
  };

  initiateBookIssue = async () => {
    var book;
    var bookId = this.state.scannedBookId.toUpperCase().trim();
    var studentId = this.state.scannedStudentId.toUpperCase().trim();
    console.log("Issue => ",bookId, studentId)
    const query = await db.collection('books').where('bookId', '==', bookId).limit(1).get();
    console.log(63, query, query.docs)
      query.docs.map((d) => {
      book = d.data();
      // console.log(64,book.bookDetails.cover)
    })
    db.collection('transactions').add({
      studentID: studentId,
      bookId: bookId,
      DOT: firebase.firestore.Timestamp.now().toDate(),
      type: 'Issue',
      cover:book.bookDetails.cover,
    });
    // console.log('Updated Transaction Table');

    db.collection('books').doc(bookId).update({
      bookAvailability: false,
    });
    // console.log('Updated Books Table');

    db.collection('students')
      .doc(studentId)
      .update({
        numberOfBooksIssued: firebase.firestore.FieldValue.increment(1),
      });
    // console.log('Updated Students Table');
    // Alert.alert("Book Issued!")
    ToastAndroid.show('Book Issued', ToastAndroid.SHORT);
    this.setState({
      scannedBookId: '',
      scannedStudentId: '',
    });
  };

  initiateBookReturn = async () => {
    var book;
    var bookId = this.state.scannedBookId.toUpperCase().trim();
    var studentId = this.state.scannedStudentId.toUpperCase().trim();
    const query = await db.collection('books').where('bookId', '==', bookId).limit(1).get();
    // console.log(63, query, query.docs)
      query.docs.map((d) => {
      book = d.data();
      // console.log(64,book.bookDetails.cover)
    })
    db.collection('transactions').add({
      studentID: studentId,
      bookId: bookId,
      DOT: firebase.firestore.Timestamp.now().toDate(),
      type: 'Return',
      cover:book.bookDetails.cover,
    });
    // console.log('Updated Transaction Table');

    db.collection('books').doc(bookId).update({
      bookAvailability: true,
    });
    // console.log('Updated Books Table');

    db.collection('students')
      .doc(studentId)
      .update({
        numberOfBooksIssued: firebase.firestore.FieldValue.increment(-1),
      });
    // console.log('Updated Students Table');
    // Alert.alert("Book Issued!")
    ToastAndroid.show('Book Issued', ToastAndroid.SHORT);
    this.setState({
      scannedBookId: '',
      scannedStudentId: '',
    });
  };

  handleTransaction = async () => {
    var bookId = this.state.scannedBookId.toUpperCase().trim();
    var studentId = this.state.scannedStudentId.toUpperCase().trim();
    var transactionType,
      studentEligiblity,
      book,
      inc_val,
      flag = false;
    // console.log('BID => ', bookId, ' SID => ', studentId);

    const bookRef = await db
      .collection('books')
      .where('bookId', '==', bookId)
      .get();
    // console.log('bookRef => ', bookRef.docs);

    if (bookRef.docs.length === 0) {
      // console.log('BOOKID = ', false);
      Alert.alert('BookID is not present in the database.');
    } else {
      // console.log('BOOKID = ', true);

      const studentRef = await db
        .collection('students')
        .where('studentId', '==', studentId)
        .get();
      // console.log('studentRef => ', studentRef.docs.length);

      if (studentRef.docs.length === 0) {
        // console.log('STUDENTID = ', false);
        Alert.alert('StudentID is not present in the database.');
      } else {
        // console.log('STUDENTID = ', true);

        bookRef.docs.map((doc) => {
          book = doc.data();
          // console.log('book availability => ', book.bookAvailability);
          if (book.bookAvailability) {
            studentRef.docs.map((doc) => {
              var student = doc.data();
              // console.log('student has books = ', student.numberOfBooksIssued);
              if (student.numberOfBooksIssued < 2) {
                // console.log('CAN PROCEED TO INITIATE BOOK ISSUE');
                studentEligiblity = true;
                this.initiateBookIssue();
              } else {
                // console.log('LIMIT EXCEEDED');
                studentEligiblity = false;
                Alert.alert('Issued Book Limit Reached');
              }
            });
          } else {
            flag = true;
          }
        });
        if (flag) {
          const transRef = await db
            .collection('transactions')
            .where('bookId', '==', bookId)
            .get();
          // console.log('transRef => ', transRef);
          var t_arr = [];
          transRef.docs.map((d) => {
            // console.log(d.data());
            t_arr.push(d.data());
          });
          t_arr.sort(function (a, b) {
            return b.DOT - a.DOT;
          });
          // console.log('t_arr => ', t_arr);
          if (
            (t_arr[0].bookId == bookId) &
            (t_arr[0].studentID == studentId) &
            (t_arr[0].type == 'Issue')
          ) {
            // console.log('Initiate Return');
            this.initiateBookReturn();
          } else {
            // console.log('Book Unavailable');
            Alert.alert("Book Unavailable")
          }
        }
      }
    }
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState !== 'normal' && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled>
            <View>
              <Image
                source={require('../books.png')}
                style={{ width: 200, height: 200 }}
              />
              <Text style={styles.title}>WILY</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputBox}
                placeholder=" Book Id"
                placeholderTextColor="#2F5D62"
                onChangeText={(text) => {
                  this.setState({ scannedBookId: text });
                }}
                value={this.state.scannedBookId}
              />
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => {
                  this.getCameraPermissions('BookId');
                }}>
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputBox}
                placeholder=" Student Id"
                placeholderTextColor="#2F5D62"
                onChangeText={(text) => {
                  this.setState({ scannedStudentId: text });
                }}
                value={this.state.scannedStudentId}
              />
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => {
                  this.getCameraPermissions('StudentId');
                }}>
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.sumbitButton}
              onPress={async () => {
                //console.log('Submit btn pressed');
                this.handleTransaction();
              }}>
              <Text style={styles.sumbitButtonText}>Submit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    color: '#DFEEEA',
  },
  inputView: {
    flexDirection: 'row',
    margin: 20,
  },
  inputBox: {
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20,
    backgroundColor: '#A7C4BC',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    color: 'black',
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#5E8B7E',
    width: 50,
    borderWidth: 1.5,
    borderLeftWidth: 0,
    color: '#2F5D62',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#2F5D62',
    fontWeight: 'bold',
  },
  sumbitButton: {
    backgroundColor: '#8FC0A9',
    width: 100,
    height: 30,
    borderRadius: 30,
  },
  sumbitButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FAF3DD',
  },
});
