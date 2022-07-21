import React, {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import db from "../../firebase";

const auth = getAuth();

export function useAuthentication() {
	const [user, setUser] = useState();
	const [userData, setUserData] = useState();
	

	

	useEffect(() => {
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
			
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
		
			const uid = user.uid;
			//console.log("running", uid);
			getDoc(doc(db, "Users", uid)).then((dataSnapshot) => {
					console.log("UID",dataSnapshot.data()); //dataSnapshot.data().bio => prints out different parts of values 
					setUserData(dataSnapshot.data());
						// dot notation 
            })

			//const dataSnapshot = getDoc();
			//console.log("data",data);

			setUser(user);
			//setUserData(userData);

		} else {
			// User is signed out
			setUser(undefined);
		}
		});

		return unsubscribeFromAuthStatusChanged;
	}, []);

	return {
		user, userData
	};
}