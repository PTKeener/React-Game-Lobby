import firebase from "firebase"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBYjiiBViHs_MSr16v85dd3MgwCN3Zcv4M",
    authDomain: "game-lobby-training.firebaseapp.com",
    projectId: "game-lobby-training",
    storageBucket: "game-lobby-training.appspot.com",
    messagingSenderId: "543959800586",
    appId: "1:543959800586:web:6db7457219f23f42f2f8f3",
    measurementId: "G-KX88LTDGG5"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});
const storage = firebase.storage();

export {db, auth, storage};
export default firebase;