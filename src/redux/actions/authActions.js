import {
    GoogleAuthProvider,
    OAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    getAuth,
    signInWithEmailAndPassword,
    getAdditionalUserInfo,
} from 'firebase/auth';
import { createStandaloneToast } from '@chakra-ui/toast';
import theme from 'config/theme';
import { createUser, addClassesToUser } from 'utils/models/users';
import { createClass } from 'utils/models/classes';
import { RESTORE_AUTH_SESSION, AUTH_WITH_SOCIALS, AUTH_WITH_CREDENTIALS, LOG_OUT } from 'redux/actions/types';

const { toast } = createStandaloneToast({ theme });

export const authWithSocials = (service) => async (dispatch) => {
    try {
        // Determine provider and add scopes accordingly
        let provider;
        switch (service) {
            case 'MICROSOFT':
                provider = new OAuthProvider('microsoft.com');
                break;
            case 'GITHUB':
                provider = new GithubAuthProvider();
                provider.addScope('user:email');
                break;
            default:
                provider = new GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        }

        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const currentUser = auth.currentUser;
        const { isNewUser } = getAdditionalUserInfo(result);

        if (isNewUser) {
            await createUser(currentUser.email);
            const classID = await createClass('Sample Class', currentUser.email);
            await addClassesToUser(currentUser.email, classID);
        }
        const payload = {
            userID: currentUser.uid,
            email: currentUser.email,
        };
        dispatch({ type: AUTH_WITH_SOCIALS, success: true, payload });
    } catch (error) {
        console.log(error);
        if (error.code === 'auth/account-exists-with-different-credential') {
            toast({
                title: 'Email already in use',
                description: 'An account exists with a different provider.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        } else {
            toast({
                title: 'Something went wrong',
                description: 'Unable to complete login / signup process.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    }
};

export const authWithCredentials = (email, password) => async (dispatch) => {
    try {
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, email, password);
        const currentUser = auth.currentUser;
        const { isNewUser } = getAdditionalUserInfo(result);

        if (isNewUser) {
            await createUser(currentUser.email);
            const classID = await createClass('Sample Class', currentUser.email);
            await addClassesToUser(currentUser.email, classID);
        }

        const payload = {
            userID: currentUser.uid,
            email: currentUser.email,
        };
        dispatch({ type: AUTH_WITH_CREDENTIALS, success: true, payload });
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            toast({
                title: 'Email already in use',
                description: 'An account exists with a different provider.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        } else if (error.code === 'auth/wrong-password') {
            toast({
                title: 'Invalid email or password',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        } else {
            toast({
                title: 'Something went wrong',
                description: 'Unable to complete login / signup process.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    }
};

export const restoreAuthSession = (user) => async (dispatch) => {
    const payload = {
        userID: user.uid,
        email: user.email,
    };
    return dispatch({ type: RESTORE_AUTH_SESSION, success: true, payload });
};

export const logOut = () => async (dispatch) => {
    const auth = getAuth();
    await auth.signOut();
    window.location.href = '/auth';
    dispatch({ type: LOG_OUT, success: true });
};
