import { createStandaloneToast } from '@chakra-ui/toast';
import { LOAD_CLASS_LIST, REFRESH_CLASS_LIST, SELECT_CLASS, CREATE_NEW_CLASS } from 'redux/actions/types';
import { createClass, retrieveClasses } from 'utils/models/classes';
import theme from 'config/theme';

const { toast } = createStandaloneToast({ theme });

export const loadClassList = (email) => async (dispatch) => {
    const classList = await retrieveClasses(email);
    const payload = {
        classList,
        selectedClass: classList[0],
    };
    dispatch({ type: LOAD_CLASS_LIST, success: true, payload });
};

export const selectClass = (selectedClass) => (dispatch) => {
    dispatch({ type: SELECT_CLASS, success: true, payload: { selectedClass } });
};

export const newClass = (className, email, onClose) => async (dispatch) => {
    const classList = await retrieveClasses(email);
    if (classList.length < 9) {
        await createClass(className, email);
        const updatedClassList = await retrieveClasses(email);
        dispatch({ type: CREATE_NEW_CLASS, success: true, payload: { updatedClassList } });
        onClose();
        toast({
            title: 'New class created!',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
        });
    } else {
        toast({
            title: 'Maximum class limit reached',
            description: "You've reached your maximum class limit of 9.",
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
        });
    }
};

export const refreshClassList = (email) => async (dispatch) => {
    const classList = await retrieveClasses(email);
    const payload = {
        classList,
    };
    dispatch({ type: REFRESH_CLASS_LIST, success: true, payload });
};
