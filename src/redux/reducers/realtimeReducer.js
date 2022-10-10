import { SELECT_CLASS, START_SESSION } from 'redux/actions/types';

const INITIAL_STATE = {
    activeClasses: null,
    selectedClass: null,
};

const realtimeReducer = (state = INITIAL_STATE, { type, success, payload }) => {
    switch (type) {
        case SELECT_CLASS:
            return {
                ...state,
                selectedClass: payload.selectedClass,
            };
        case START_SESSION:
            return {
                ...state,
                activeClasses: payload.activeClasses,
            };
        default:
            return state;
    }
};

export default realtimeReducer;
