import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyA9q2ep9XodT1oqNFIqdYl5jR1IAqigi6o",
    authDomain: "newletter-poll.firebaseapp.com",
    projectId: "newletter-poll",
    storageBucket: "newletter-poll.appspot.com",
    messagingSenderId: "740361290291",
    appId: "1:740361290291:web:5aef9a4c1b6d2e48631946"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.database()
