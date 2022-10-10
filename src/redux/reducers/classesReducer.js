import { LOAD_CLASS_LIST, SELECT_CLASS, CREATE_NEW_CLASS, REFRESH_CLASS_LIST } from 'redux/actions/types';

const INITIAL_STATE = {
    classList: null,
    selectedClass: null,
};

const classesReducer = (state = INITIAL_STATE, { type, success, payload }) => {
    if (success === false) return state;
    switch (type) {
        case LOAD_CLASS_LIST:
            return {
                classList: payload.classList,
                selectedClass: payload.selectedClass,
            };
        case REFRESH_CLASS_LIST:
            return {
                ...state,
                classList: payload.classList,
            };
        case SELECT_CLASS:
            return {
                ...state,
                selectedClass: payload.selectedClass,
            };
        case CREATE_NEW_CLASS:
            return {
                ...state,
                classList: payload.updatedClassList,
            };
        default:
            return state;
    }
};

export default classesReducer;
