import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCzQTtL8TaCjtAURSrbwOvVgRpw2xE6sfM",
  authDomain: "AIzaSyCzQTtL8TaCjtAURSrbwOvVgRpw2xE6sfM",
  databaseURL: "https://cryptotracker-bf66d.firebaseio.com"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const reference = firebase
export default firebase