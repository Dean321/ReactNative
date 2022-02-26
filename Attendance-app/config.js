import firebase from 'firebase';

try {
  firebase.initializeApp({
   // Add your config here
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const fb = firebase.database();
export default fb;
