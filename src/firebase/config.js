import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyAf0W0nJHUGyCHMRKb-mN1bZXSkrpSulps',
    authDomain: 'movie-x-51215.firebaseapp.com',
    projectId: 'movie-x-51215',
    storageBucket: 'movie-x-51215.appspot.com',
    messagingSenderId: '852783316754',
    appId: '1:852783316754:web:eb009891b78134e51c3dcb',
}

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }
