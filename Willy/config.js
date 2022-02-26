import firebase from 'firebase';
require("firebase/firestore");

var firebaseConfig = {
     //Add your config here
    }

firebase.initializeApp(firebaseConfig)
export default firebase.firestore()
