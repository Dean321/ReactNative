import firebase from "firebase";


const firebaseConfig = {
   // add your API Key here
  };

firebase.initializeApp(firebaseConfig);

export default firebase.database()
