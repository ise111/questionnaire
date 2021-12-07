import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
      apiKey: "AIzaSyBpUry8ZInJ_0iVZCA8b3QMN1ZSrxZRZkA",
  authDomain: "questionnaire-249d4.firebaseapp.com",
  projectId: "questionnaire-249d4",
  storageBucket: "questionnaire-249d4.appspot.com",
  messagingSenderId: "715495423055",
  appId: "1:715495423055:web:7ef8a9a26b3a46c455be3a"
}

firebase.initializeApp(firebaseConfig)

export default firebase