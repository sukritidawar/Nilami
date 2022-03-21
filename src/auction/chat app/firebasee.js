import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBWnk084nQpXgqH2xm-bU7yfAeczyPI3lA",
    authDomain: "nilami.firebaseapp.com",
    projectId: "nilami",
    storageBucket: "nilami.appspot.com",
    messagingSenderId: "531805701548",
    appId: "1:531805701548:web:dd4f324d70106e16942609"
})

const db = firebaseApp.firestore()

export { db}