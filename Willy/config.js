import firebase from 'firebase';
require("firebase/firestore");

var firebaseConfig = {
      apiKey: "AIzaSyCon1XAe8Eqbd12pd4GtDD5PlHTlmP2k0g",
      authDomain: "wily-447d3.firebaseapp.com",
      projectId: "wily-447d3",
      storageBucket: "wily-447d3.appspot.com",
      messagingSenderId: "807353103797",
      appId: "1:807353103797:web:c9ff7bd66c91aa1e9595fc"
    }

firebase.initializeApp(firebaseConfig)
export default firebase.firestore()