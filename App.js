import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GiftedChat, Video } from 'react-native-gifted-chat'
import db from "./firebase";



export default function App() {

  const [messages, setMessages] = useState([]); //call back hook
  const [placeholder, setPlaceHolder] = useState("type a message")
  //const [showUserAvatar, setUserAvatar] = useState([]); 
  //const [alwaysShowSend, setalwaysShowSend] = useState([]); 

    useEffect(() => {
      db.collection("Chats")
        .doc("myfirstchat")
        .get()
        .then((snapshot) => {
          console.log(snapshot.id);
          console.log(snapshot.data());
        });
    }, []);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: placeholder,
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //       image: 'https://placeimg.com/140/140/any',
        
  //     },


  //     {
  //       _id: 2,
  //       text: 'hello world',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'Reafdfsfct Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //       video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  //     },
      
  //     {
  //       _id: 6,
  //       text: 'hello world',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 6,
  //         avatar: 'https://i.ytimg.com/vi/Zr-qM5Vrd0g/maxresdefault.jpg',
  //         text: 'hello!',
       
  //       },
  //     },





  //   ])
  // }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])



  return (
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}


      user={{
        _id: 6,
        name: 'Ingrid',
        avatar: 'https://i.ytimg.com/vi/Zr-qM5Vrd0g/maxresdefault.jpg',
        text: 'hello!',

      }}
      showUserAvatar={true}
      alwaysShowSend={true}
      renderUsernameOnMessage={true}
      />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



//////example: 
// {
//   _id: 1,
//   text: 'My message',
//   createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
//   user: {
//     _id: 2,
//     name: 'React Native',
//     avatar: 'https://facebook.github.io/react/img/logo_og.png',
//   },
//   image: 'https://facebook.github.io/react/img/logo_og.png',
//   // You can also add a video prop:
//   video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
//   // Mark the message as sent, using one tick
//   sent: true,
//   // Mark the message as received, using two tick
//   received: true,
//   // Mark the message as pending with a clock loader
//   pending: true,
//   // Any additional custom parameters are passed through
// }