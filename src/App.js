import React, { useRef, useState }  from 'react';
import './App.css';
import { SignIn, SignOut } from './components/Sign_In_Out';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { auth, signInWithGoogle, firestore } from './firebase/firebase.utils';
import MyChat from './components/my-Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { connect } from 'react-redux';

function App({currentUser}) {

  const [user] = useAuthState(auth);
 // const user = currentUser;


  return (
    <div className="App">
      <header>
        <SignOut />
      </header>
      <section>
        {user ? <MyChat /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;

/*
const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(App);
*/