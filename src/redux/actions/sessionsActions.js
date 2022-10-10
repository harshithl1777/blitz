import { LOAD_ACTIVE_SESSIONS, UPDATE_ACTIVE_SESSIONS, START_SESSION, END_SESSION } from 'redux/actions/types';
import {
    retrieveSessions,
    retrieveSessionsByCode,
    createSession,
    retrieveSessionByID,
    deleteSession,
} from 'utils/models/sessions';
import { updateClassHistory } from 'utils/models/classes';

export const loadActiveSessions = (email) => async (dispatch) => {
    const activeSessions = await retrieveSessions(email);
    const activeClasses = activeSessions.map((session) => session.classID);
    const payload = {
        activeSessions,
        activeClasses,
    };
    dispatch({ type: LOAD_ACTIVE_SESSIONS, success: true, payload });
};

export const updateActiveSessions = (currentSessions, updatedSession) => (dispatch) => {
    const updatedActiveSessions = [];
    currentSessions.forEach((session) => {
        if (session.classID === updatedSession.classID) {
            updatedActiveSessions.push(updatedSession);
        } else {
            updatedActiveSessions.push(session);
        }
    });
    const payload = {
        activeSessions: updatedActiveSessions,
    };
    dispatch({ type: UPDATE_ACTIVE_SESSIONS, success: true, payload });
};

export const startSession = (email, classID) => async (dispatch) => {
    let code = null;
    while (true) {
        const codeToTest = Math.floor(100000 + Math.random() * 900000);
        const duplicateCodes = await retrieveSessionsByCode(codeToTest);
        if (duplicateCodes.length === 0) {
            code = codeToTest;
            break;
        }
    }
    await createSession(email, classID, code, Date.now());
    const activeSessions = await retrieveSessions(email);
    const activeClasses = activeSessions.map((session) => session.classID);
    const payload = {
        activeSessions,
        activeClasses,
    };
    dispatch({ type: START_SESSION, success: true, payload });
};

export const endSession = (sessionID, email) => async (dispatch) => {
    const session = await retrieveSessionByID(sessionID);
    await updateClassHistory(session.classID, session.attendance, session.startedAt);
    await deleteSession(sessionID);
    const activeSessions = await retrieveSessions(email);
    const activeClasses = activeSessions.map((session) => session.classID);
    const payload = {
        activeSessions,
        activeClasses,
    };
    dispatch({ type: END_SESSION, success: true, payload });
};
