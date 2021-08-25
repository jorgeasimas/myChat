import React, { useRef, useState }  from 'react';
import './App.css';
import { SignIn } from './components/Sign_In_Out';
import { Sign_Out } from './components/Sign_Out';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import MyChat from './components/my-Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
//import { useAuthState } from 'react-firebase-hooks/firestore';
import { connect } from 'react-redux';
import ChatRoom from './components/Chat-room';
import { auth } from './firebase/firebase.utils';

function App({currentUser}) {

 const [user] = useAuthState(auth);  
// const user2 = auth.currentUser;
   console.log(user)
 //  console.log(user2)


  return (
    <div className="App">
      <header>
      <Sign_Out />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

//export default App;


const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(App);
