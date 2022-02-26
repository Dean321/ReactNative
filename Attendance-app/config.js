import firebase from 'firebase';

try {
  firebase.initializeApp({
    apiKey: 'AIzaSyCon1XAe8Eqbd12pd4GtDD5PlHTlmP2k0g',
    authDomain: 'wily-447d3.firebaseapp.com',
    databaseURL:
      'https://wily-447d3-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'wily-447d3',
    storageBucket: 'wily-447d3.appspot.com',
    messagingSenderId: '807353103797',
    appId: '1:807353103797:web:574cd3dae8eb2dc69595fc',
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const fb = firebase.database();
export default fb;
