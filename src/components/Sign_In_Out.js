import React, { useRef, useState } from 'react';
import '.././App.css';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { auth, signInWithGoogle } from '.././firebase/firebase.utils';
import { connect } from 'react-redux';
import {googleSignInStart} from '../redux/sagas';
      
    export function SignIn({googleSignInStart, currentUser}) {

        console.log("initial");
        const user = {currentUser};
        console.log(user);
        return (
          <div>
            <button className="sign-in" onClick={googleSignInStart}>Sign in with a Google</button>
          </div>
        ) 
  }
 
  const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart())
  });

  const mapStateToProps = (state) => ({
    currentUser: state.currentUser
  });

  export default connect(mapStateToProps,mapDispatchToProps)(SignIn);

  