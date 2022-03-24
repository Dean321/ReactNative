import firebase from 'firebase'

try {
firebase.initializeApp({
    apiKey: "AIzaSyAwO5CFg8P3omKHR991K_6OcUNp8xeSZxA",
    authDomain: "wireless-buzzer-b63e2.firebaseapp.com",
    databaseURL: "https://wireless-buzzer-b63e2-default-rtdb.firebaseio.com",
    projectId: "wireless-buzzer-b63e2",
    storageBucket: "wireless-buzzer-b63e2.appspot.com",
    messagingSenderId: "356018324983",
    appId: "1:356018324983:web:546b6f8b4fbf02fd219af2",
    measurementId: "G-MW34SQ7XVJ"
})
} catch (err) {
if (!/already exists/.test(err.message)) {
console.error('Firebase initialization error', err.stack)
}
}

const fb= firebase.database()
export default fb