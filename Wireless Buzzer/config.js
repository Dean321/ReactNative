import firebase from 'firebase'

try {
firebase.initializeApp({
   <YOUR API KEY>
})
} catch (err) {
if (!/already exists/.test(err.message)) {
console.error('Firebase initialization error', err.stack)
}
}

const fb= firebase.database()
export default fb
