
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
import styled from "styled-components";


const Button = styled.button`
  min-width: 2px;
  width: 80px;
  height: auto;
  letter-spacing: 0.5px;
  line-height: 15px;
  padding: 3px 3px 3px 3px;
  font-size: 12px;
  background-color: gray;
  color: white;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  cursor: pointer;
`;

const StyledListItem = styled.div`
  padding: 10px;

  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;


function ChatRoom() {
    const [collection, setCollection] = useState('messages')
    const usersRef = firestore.collection("users");
    const dummy = useRef();
    const messagesRef = firestore.collection(collection);
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');
    const [usersList, setUsersList] = useState([])
    const [openchat, setOpenchat] = useState(false);
  
    
    
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
    
    function handleClick (item) {
          console.log("open new chat");
          switch (item) {
            case 'jorgeasimas@gmail.com':
              return setCollection('messages2');
            case 'otheremail@gmail.com':
              return setCollection('messages1');
          }
          setOpenchat(!openchat);
    //      <button onClick={handleClick}>X</button>
        }
    return (
    <div>
      <div className="listGrid">
       <div className="userList"> 
        <button onClick={listUsers}>fetch all users</button>
        {usersList.map((item, key) =>   
            <StyledListItem>
            <span>{item}</span>
            <Button onClick={() => handleClick(item)}>Start chat</Button>
            </StyledListItem>   
        )
    }
            
      </div>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="type your message" />
        <button type="submit" disabled={!formValue}>SEND</button>
      </form>
      </div> 

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

  export default ChatRoom;