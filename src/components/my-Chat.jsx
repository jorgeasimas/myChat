
import React, { useRef, useState } from 'react';
import '.././App.css';
import { SignIn, SignOut } from './Sign_In_Out';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { auth, signInWithGoogle, usersRef, firestore } from '../firebase/firebase.utils';
import admin from 'firebase-admin';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ListItem from './List-Item';



function MyChat() {
    const usersRef = firestore.collection("users");
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');
    const [usersList, setUsersList] = useState([])
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  

    function listUsers () {
      usersRef.get().then((querySnapshot) =>{
        querySnapshot.forEach((doc)=>{setUsersList([...usersList, doc.data().email])
        }); 
      })
    }
    
    console.log(usersList);
    return (
    <div>
      <div className="listGrid">
       <div className="userList"> 
        <button onClick={listUsers}>fetch all users</button>
        {usersList.map((item, key) => 
           <ListItem item={item} key={key} />
        )}
            
      </div>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>
      </div> 
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="type your message" />
        <button type="submit" disabled={!formValue}>SEND</button>
      </form>
    </div>)
  }
  
  
  function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
      </div>
    </>)
  }

/*
  const listAllUsers = (nextPageToken) => {
    // List batch of users, 50 at a time.
    admin
      .auth()
      .listUsers(10, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          console.log('user', userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log('Error listing users:', error);
      });
  };
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();
*/




  export default MyChat;