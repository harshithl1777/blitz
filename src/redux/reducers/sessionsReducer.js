import { LOAD_ACTIVE_SESSIONS, START_SESSION, END_SESSION, UPDATE_ACTIVE_SESSIONS } from 'redux/actions/types';

const INITIAL_STATE = {
    activeSessions: null,
    activeClasses: null,
};

const sessionsReducer = (state = INITIAL_STATE, { type, success, payload }) => {
    if (success === false) return state;
    switch (type) {
        case LOAD_ACTIVE_SESSIONS:
        case START_SESSION:
        case END_SESSION:
            return {
                activeSessions: payload.activeSessions,
                activeClasses: payload.activeClasses,
            };
        case UPDATE_ACTIVE_SESSIONS:
            return {
                ...state,
                activeSessions: payload.activeSessions,
            };
        default:
            return state;
    }
};

export default sessionsReducer;
