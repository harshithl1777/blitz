import { RESTORE_AUTH_SESSION, AUTH_WITH_SOCIALS, AUTH_WITH_CREDENTIALS, LOG_OUT } from 'redux/actions/types';

const INITIAL_STATE = {
    isLoggedIn: null,
    userID: null,
    email: null,
};

const authReducer = (state = INITIAL_STATE, { type, success, payload }) => {
    if (success === false) return state;
    switch (type) {
        case RESTORE_AUTH_SESSION:
        case AUTH_WITH_SOCIALS:
        case AUTH_WITH_CREDENTIALS:
            return {
                isLoggedIn: true,
                userID: payload.userID,
                email: payload.email,
            };
        case LOG_OUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default authReducer;
