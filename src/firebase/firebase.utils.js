import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';



const config = {
  apiKey: "AIzaSyBjtl5dVm-h0Uah1Kwt65--WnZJJRNlamo",
  authDomain: "my-chat-a7b6d.firebaseapp.com",
  projectId: "my-chat-a7b6d",
  storageBucket: "my-chat-a7b6d.appspot.com",
  messagingSenderId: "1074409928589",
  appId: "1:1074409928589:web:a9e5e3b5728e8377feefc4",
  measurementId: "G-NW4RYNZQ6E"
  };

  firebase.initializeApp(config);
  firebase.analytics();
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const analytics = firebase.analytics();

  export const usersRef = firestore.collection("users");


  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
 //                   firestore.collection('users').doc('userDoc');
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };


  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

  export const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
//  export const signInWithGoogle = () => auth.signInWithPopup(provider);

function listUsers () {
  usersRef.get().then((querySnapshot) =>{
    querySnapshot.forEach((doc)=>{
      console.log(doc.data().displayName, " => " ,doc.data())
    }); 
  })
}
listUsers();


  export default firebase;