import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { doc, onSnapshot, arrayUnion, updateDoc } from "firebase/firestore";
import db from "../firebase";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import firebase from "firebase/app";
import { useFonts } from 'expo-font';
//import  use authentication();


export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const { user, userData } = useAuthentication();

  //console.log("User------>", user);
  //console.log("User Data aaaaaaaaaa",userData);


  useEffect(() => { //confused about what this does still...
    let unsubscribeFromNewSnapshots = onSnapshot(doc(db, "Chats", "myfirstchat"), (snapshot) => {
      console.log("New Snapshot! ", snapshot.data().messages);
      setMessages(snapshot.data().messages);

    });

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback(async (messages = []) => { // message in firebase going through an array and displaying each one in app 
    await updateDoc(doc(db, "Chats", "myfirstchat"), {
      messages: arrayUnion(messages[0])
    });
    //setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);
  
  if (!(user && userData)) {
    return (
      <View></View>
    )
  }
  console.log("User ID --->",user.uid)
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.uid,
        name: userData.username,
      }}
      showUserAvatar={false}
      renderUsernameOnMessage={true}
    />
  );
}