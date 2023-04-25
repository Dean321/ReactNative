import firebase from 'firebase';
// require('firebase/firestore');

var firebaseConfig = {
 //Add your API config here
};

firebase.initializeApp(firebaseConfig);
export default firebase.database();
