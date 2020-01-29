import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBcwcJOw-pEQa4F-3EfVXxCz2gysCx0keU",
    authDomain: "full-firebase-ionic4.firebaseapp.com",
    databaseURL: "https://full-firebase-ionic4.firebaseio.com",
    projectId: "full-firebase-ionic4",
    storageBucket: "full-firebase-ionic4.appspot.com",
    messagingSenderId: "1090501687137",
    appId: "1:1090501687137:web:1be2f4b447f39351"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();
