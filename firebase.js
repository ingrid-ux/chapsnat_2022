import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    // your stuff
    apiKey: "AIzaSyDNsGpr63xLAhAbF__Il9kQw9I1AFQ0nv8",
    authDomain: "chapsnat-b2bc0.firebaseapp.com",
    projectId: "chapsnat-b2bc0",
    storageBucket: "chapsnat-b2bc0.appspot.com",
    messagingSenderId: "1013682065301",
    appId: "1:1013682065301:web:f465a3b37dfab58ce7709c",
    measurementId: "G-VNX4RF1R7N"

        // apiKey: "AIzaSyC7CQwBSzjC_tlEiMd2Mc8Sh9Fb_Cwc1p8",
        // authDomain: "chapsnat-3f4f7.firebaseapp.com",
        // projectId: "chapsnat-3f4f7",
        // storageBucket: "chapsnat-3f4f7.appspot.com",
        // messagingSenderId: "239440555368",
        // appId: "1:239440555368:web:d7d431a3733e778d273add",
        // measurementId: "G-W4Y70B8JL2",
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;


// import firebase from "@firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import "@firebase/firestore";

// // Your web app's Firebase configuration, which you copy-pasted from Step 6
// var firebaseConfig = {
//     apiKey: "AIzaSyDNsGpr63xLAhAbF__Il9kQw9I1AFQ0nv8",
//     authDomain: "chapsnat-b2bc0.firebaseapp.com",
//     projectId: "chapsnat-b2bc0",
//     storageBucket: "chapsnat-b2bc0.appspot.com",
//     messagingSenderId: "1013682065301",
//     appId: "1:1013682065301:web:f465a3b37dfab58ce7709c",
//     measurementId: "G-VNX4RF1R7N"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// let firestore = firebase.firestore();
// export default firestore;