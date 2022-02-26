import firebase from 'firebase'

try {
firebase.initializeApp({
  apiKey: "AIzaSyA9q2ep9XodT1oqNFIqdYl5jR1IAqigi6o",
  authDomain: "newletter-poll.firebaseapp.com",
  databaseURL: "https://newletter-poll-default-rtdb.firebaseio.com",
  projectId: "newletter-poll",
  storageBucket: "newletter-poll.appspot.com",
  messagingSenderId: "740361290291",
  appId: "1:740361290291:web:5aef9a4c1b6d2e48631946"
})
} catch (err) {
if (!/already exists/.test(err.message)) {
console.error('Firebase initialization error', err.stack)
}
}

const fb= firebase.database()
export default fb