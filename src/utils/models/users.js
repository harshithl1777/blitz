import { doc, setDoc, getDoc } from 'firebase/firestore';
import db from 'index';

export const createUser = async (email) => {
    await setDoc(doc(db, 'users', email), { email, classes: [] });
};

export const addClassesToUser = async (email, classID) => {
    // Get user by email and add class to classes array
    const userRef = doc(db, 'users', email);
    const user = await getDoc(userRef);
    if (user.exists()) {
        console.log(user.data().classes);
        const classes = user.data().classes;
        classes.push(classID);
        await setDoc(userRef, { classes }, { merge: true });
    }
};
