
import { Text, View, Image, TextInput,Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useState} from "react"
import { YellowBox } from 'react-native-web';
import {useFonts} from 'expo-font';
import * as Font from 'expo-font';
import { BorderlessButton } from 'react-native-gesture-handler';


export default function LoginScreen({navigation}) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loaded] = useFonts({
		Avenir: require('../fonts/AvenirNextLTPro-Bold.otf'),
	  });

	const auth = getAuth(); //Returns the FirebaseAuth object for an App.

	async function handleSubmit() {
		console.log("handle submit envoked!!")

		await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user; 
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
		});

        
	}
    console.log(auth, "firebase auth object"); 


	return (
        //<View style={styles.container}>

		<>
  
      
        <View style={styles.container}>
            <Image  
            style={styles.tinyLogo}
            source={require('../assets/ghost.png')}/>
			<Text style={styles.bigBlue}>Log In </Text>
			<View style={styles.inputView}>
				<TextInput style={{fontFamily:'Avenir'}}
					placeholder='Email'
					placeholderTextColor="#003f5c"
					onChangeText={(email) => setEmail(email)} //function setting the current of text of that current input 
                    // passes email from what you typed 
                />
			</View>
			<View style={styles.inputView}>
					<TextInput style={{fontFamily:'Avenir'}}
					placeholder='Password'
					secureTextEntry={true}
					placeholderTextColor="#003f5c"
					onChangeText={(password) => setPassword(password)}
					/>
			</View>
			<TouchableOpacity style={styles.loginBtn} onPress={() => {
				handleSubmit();
			}}>
				<Text style={styles.loginText}>LOGIN</Text>
			</TouchableOpacity>

            <TouchableOpacity style={styles.redirectBtn} onPress={() => {
                navigation.navigate("Signup")
            }}>
                <Text style={{color:"white",fontFamily:'Avenir'}}>Don't have an account? Sign up here</Text>
            </TouchableOpacity>

            </View>
		</>
    //</View>

	)
}


const styles = StyleSheet.create({
	loginText:{

		fontFamily:'Avenir',
		fontWeight: 'bold',
		fontSize: 15,
		color: 'white',

	},
    tinyLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: '#fffc00',
        resizeMode: 'contain', //prevents image from cutting from sides
      },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffc00',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
		fontFamily: 'Avenir',

    },
	redirectBtn: {
		width:"80%",
		borderRadius:25,
		height:50,
		alignItems:"center",
		justifyContent:"center",
		marginTop:40,
		backgroundColor:"#0eadff",
		color: "white",
		fontFamily: 'Avenir'

		
	},
	//input for email and password button inputs
	inputView: {
		fontFamily: 'Avenir',
		backgroundColor: "white",
		borderRadius: 10,
		width: "70%",
		height: 45,
		//marginTop: 10,
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "center",
		
	},
	TextInput: {
		height: 50,
		flex: 1,
		padding: 10,
		marginLeft: 20,
		
		
	},
	// red log in button
	loginBtn: {
		width:"40%",
		borderRadius:25,
		height:50,
		alignItems:"center",
		justifyContent:"center",
		marginTop:10,
		backgroundColor:"red",
		fontFamily:'Avenir',
	},
	bigBlue: {
		fontFamily: 'Avenir',
		color: 'black',
		fontWeight: 'bold',
		fontSize: 30,
		padding: 50,
		marginBottom: -30,
	}
})