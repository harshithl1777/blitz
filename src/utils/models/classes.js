import { collection, addDoc, query, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import db from 'index';

export const createClass = async (name, email) => {
    // Create initials for class
    const nameInitialsArray = name.split(' ').map((word) => word[0]);
    const initials = nameInitialsArray.length >= 2 ? nameInitialsArray[0] + nameInitialsArray[1] : nameInitialsArray[0];

    // Get list of available colors and randomly select one
    const classQuery = query(collection(db, 'classes'), where('instructor', '==', email));
    const querySnapshot = await getDocs(classQuery);
    const usedColors = [];
    const colors = ['cyan', 'blue', 'green', 'teal', 'red', 'yellow', 'orange', 'purple', 'pink'];
    querySnapshot.forEach((doc) => usedColors.push(doc.data().color));
    const availableColors = colors.filter((color) => !usedColors.includes(color));
    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];

    // Push data to firestore
    const docRef = await addDoc(collection(db, 'classes'), { name, initials, instructor: email, color: randomColor });
    return docRef.id;
};

export const retrieveClasses = async (email) => {
    const classQuery = query(collection(db, 'classes'), where('instructor', '==', email));
    const querySnapshot = await getDocs(classQuery);
    const classes = [];
    querySnapshot.forEach((doc) => classes.push({ id: doc.id, ...doc.data() }));
    return classes;
};

export const retrieveClassByID = async (classID) => {
    const classRef = doc(db, 'classes', classID);
    const classObj = await getDoc(classRef);
    return classObj.data();
};

export const updateClassHistory = async (classID, attendance, startedAt) => {
    const classRef = doc(db, 'classes', classID);
    const classObj = await getDoc(classRef);
    const history = classObj.data().history;
    history.unshift({ attendance, startedAt });
    await setDoc(classRef, { history }, { merge: true });
};
