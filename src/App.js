import React, { useRef, useState }  from 'react';
import './App.css';
import { SignIn, SignOut } from './components/Sign_In_Out';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import MyChat from './components/my-Chat';
import { connect } from 'react-redux';
import ChatRoom from './components/Chat-room';

function App({currentUser}) {

//  const [user] = useAuthState(auth);  
   const user = currentUser;
   console.log(user)


  return (
    <div className="App">
      <header>
      <SignOut />
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
