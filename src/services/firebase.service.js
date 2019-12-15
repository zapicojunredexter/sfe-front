import firebase from 'firebase/app';

const config = {
    apiKey: "AIzaSyDUMEhTingHFa51x4CsO1--Py-ER_UGHcw",
    authDomain: "streetfood-express.firebaseapp.com",
    databaseURL: "https://streetfood-express.firebaseio.com",
    projectId: "streetfood-express",
    storageBucket: "streetfood-express.appspot.com",
    messagingSenderId: "83846861839",
    appId: "1:83846861839:web:dec388254ccdc5faffbf7a",
    measurementId: "G-QDJTFQ990V"
};

export default () => firebase.initializeApp(config);
