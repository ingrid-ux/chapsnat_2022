import React, { useState, useEffect } from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {useFonts} from 'expo-font';
import db from "../firebase";



export default function HomeScreen({ navigation }) {

	const [state, setState] = useState();
	const [loaded] = useFonts({
		Avenir: require('../fonts/AvenirNextLTPro-Bold.otf'),
	  });

	const auth = getAuth();
	const user = auth.currentUser;

	console.log(user, "<--- user in the home screen")

	if (user !== null) { // if user is not logged in or signed up, they cannot access chats, otherwise they can
		return (
			<View style={styles.container}>

			<TouchableOpacity style={styles.logoutBtn} onPress={() => {
				signOut(auth).then(() => {
					// Sign-out successful.
					user = null;
				}).catch((error) => {
					// An error happened.
					// should we do something with that error??
				});
			}}>
				<Text style={styles.loginText}>Sign Out</Text>
			</TouchableOpacity>

			<Text style={styles.helloText}>Hello, {user.email}! </Text>
			<Image  
            style={styles.tinyLogo}
            source={require('../assets/winkyface.png')}/>

			<TouchableOpacity style={{backgroundColor:"red",borderRadius:30,width:"60%", marginTop:30,}}
				onPress={() => navigation.navigate("Chat")}
			>
				<Text style={styles.item}>Chat</Text>
			</TouchableOpacity>
			</View>
			)
	} else if (user === null) { // if user is not logged in or have signed up, they cannot access chats 
    // only sign up / login pages can be viewedz
		return (
		<View style={styles.container}>
		<TouchableOpacity
			onPress={() => navigation.navigate("Login")}
		>
			<Text style={styles.item}>login</Text>
		</TouchableOpacity>

		<TouchableOpacity
			onPress={() => navigation.navigate("Signup")}
		>
			<Text style={styles.item}>signup</Text>
		</TouchableOpacity>
		</View>
		);
	}
	
}
const styles = StyleSheet.create({

	tinyLogo: {
        //justifyContent: 'center',
        alignItems: 'center',
		marginTop: 20,
        width: 200,
        height: 200,
        backgroundColor: '#fffc00',
        resizeMode: 'contain', //prevents image from cutting from sides
      },

	helloText:{
		fontFamily:"Avenir",
		fontSize: 20,

	},

	loginText:{
		fontFamily: "Avenir",

	},
	logoutBtn: {
		width:"50%",
		borderRadius:25,
		margin: 25,
		height:50,
		alignItems:"center",
		justifyContent:"center",
		backgroundColor:"grey",
		color: "white"
		
	},
	container: {
		flex: 1,
		backgroundColor: "yellow",
		alignItems: "center",
		fontFamily: "Avenir",
		
	},
	item: {
		padding: 10,
		fontSize: 20,
		height: 44,
		//backgroundColor: "yellow",
		borderRadius: 25,
		margin: 20,
		fontFamily: "Avenir",
		alignContent:"center",
		justifyContent: "center",
		alignSelf: "center", // centered text inside of button
		color:"white",
	},
});