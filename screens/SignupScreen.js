import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from "react"

export default function LoginScreen({navigation}) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

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
			<Text style={styles.bigBlue}>Signup Here</Text>
			<View style={styles.inputView}>
				<TextInput
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
				<Text style={styles.loginText}>Signup</Text>
			</TouchableOpacity>

            <TouchableOpacity style={styles.redirectBtn} onPress={() => {
                    navigation.navigate("Login") 
                }}>
                <Text>Already have an account? Login here</Text>
            </TouchableOpacity>
		</>
	)
}
//styles
const styles = StyleSheet.create({
	redirectBtn: {
		width:"80%",
		borderRadius:25,
		height:50,
		alignItems:"center",
		justifyContent:"center",
		marginTop:40,
		backgroundColor:"grey",
		color: "white"
	},
	inputView: {
		backgroundColor: "#FFC0CB",
		borderRadius: 30,
		width: "70%",
		height: 45,
		marginBottom: 20,
		alignItems: "center",
	},
	TextInput: {
		height: 50,
		flex: 1,
		padding: 10,
		marginLeft: 20,
	},
	loginBtn: {
		width:"80%",
		borderRadius:25,
		height:50,
		alignItems:"center",
		justifyContent:"center",
		marginTop:40,
		backgroundColor:"#FF1493",
	},
	bigBlue: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 30,
		padding: 50
	}
})