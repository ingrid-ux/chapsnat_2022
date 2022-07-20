import { Text, View,Image, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithCustomToken } from "firebase/auth";
import {useState} from "react"
import {useFonts} from 'expo-font';


export default function LoginScreen({navigation}) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loaded] = useFonts({
		Avenir: require('../fonts/AvenirNextLTPro-Bold.otf'),
	  });

	const auth = getAuth(); // what exactly does this do/what this is and how come it doesn't pass a parameter like email or password

	async function handleSubmit() { // what does this do?? async vs await
        // async functions allow you to order your code until something allows you do something
        // they allow you to control the order of your code otherwise js+react just compiles continously
        // same concept as fetch calls - result of this creates a user- dont exit the function until we get results 
		console.log("handle submit envoked!!")

		await createUserWithEmailAndPassword(auth, email, password) //passes info of user inside to authenticate if user exists
		.then((userCredential) => {
			const user = userCredential.user;
			auth.currentUser = user;
		})
		.catch((error) => { //if error comes, error messages will occur
			const errorCode = error.code;
			const errorMessage = error.message; // no error messages are provided, thus the color is faded
            console.log(errorCode, "<---- error code");
            console.log(errorMessage, "<--- error message"); // used to debug or fix things 
		});
	}

	return (
		<>

        {/* components  */}
		<View style={styles.container}>
		<Image  
            style={styles.tinyLogo}
            source={require('../assets/friend.png')}/>
			<Text style={styles.bigBlue}>Sign Up</Text>
			<View style={styles.inputView}>
				<TextInput style={{fontFamily:'Avenir'}}
					placeholder='Email'
					placeholderTextColor="#003f5c"
					onChangeText={(email) => setEmail(email)} // sets email
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					placeholder='Password'
					secureTextEntry={true}
					placeholderTextColor="#003f5c"
					onChangeText={(password) => setPassword(password)} // sets password 
				/>
			</View>
			<TouchableOpacity style={styles.loginBtn} onPress={() => {
				handleSubmit(); // passes info on button press
			}}>
				<Text style={{fontFamily:"Avenir", fontWeight: "bold",color:"white"}}>SIGN UP</Text>
				{/* styles.loginText */}
			</TouchableOpacity>

            <TouchableOpacity style={styles.redirectBtn} onPress={() => {
                    navigation.navigate("Login") 
                }}>
                <Text>Already have an account? Login here</Text>
            </TouchableOpacity>
		</View>
		</>
	)
}
//styles
const styles = StyleSheet.create({
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
		backgroundColor:"grey",
		color: "white",
	},
	inputView: {
		// backgroundColor: "#FFC0CB",
		// borderRadius: 30,
		// width: "70%",
		// height: 45,
		// marginBottom: 20,
		// alignItems: "center",
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
	loginBtn: {
		// width:"80%",
		// borderRadius:25,
		// height:50,
		// alignItems:"center",
		// justifyContent:"center",
		// marginTop:40,
		// backgroundColor:"#FF1493",
		width:"40%",
		borderRadius:25,
		height:50,
		alignItems:"center",
		justifyContent:"center",
		marginTop:10,
		backgroundColor:"red",
		fontFamily:'Avenir',
		color:"white",
	},
	bigBlue: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 30,
		padding: 50
	}
})