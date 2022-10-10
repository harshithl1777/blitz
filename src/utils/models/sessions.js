import { collection, addDoc, query, where, getDocs, doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';
import db from 'index';

export const retrieveSessions = async (email) => {
    const sessionQuery = query(collection(db, 'sessions'), where('instructor', '==', email));
    const querySnapshot = await getDocs(sessionQuery);
    const sessions = [];
    querySnapshot.forEach((doc) => sessions.push({ id: doc.id, ...doc.data() }));
    return sessions;
};

export const retrieveSessionsByCode = async (code) => {
    const sessionQuery = query(collection(db, 'sessions'), where('code', '==', code));
    const querySnapshot = await getDocs(sessionQuery);
    const sessions = [];
    querySnapshot.forEach((doc) => sessions.push({ id: doc.id, ...doc.data() }));
    return sessions;
};

export const createSession = async (email, classID, code, timestamp) => {
    const docRef = await addDoc(collection(db, 'sessions'), {
        code,
        classID,
        attendance: [],
        instructor: email,
        startedAt: timestamp,
    });
    return docRef.id;
};

export const addSessionAttendanceRecord = async (sessionID, name, studentID, timestamp) => {
    const sessionRef = doc(db, 'sessions', sessionID);
    const session = await getDoc(sessionRef);
    const attendance = session.data().attendance;
    attendance.push({ name, studentID, timestamp });
    await setDoc(sessionRef, { attendance }, { merge: true });
};

export const retrieveSessionByID = async (sessionID) => {
    const sessionRef = doc(db, 'sessions', sessionID);
    const session = await getDoc(sessionRef);
    return session.data();
};

export const deleteSession = async (sessionID) => {
    await deleteDoc(doc(db, 'sessions', sessionID));
};

window.addEventListener('beforeunload', () => {});
