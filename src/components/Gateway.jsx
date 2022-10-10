import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Box, Spinner } from '@chakra-ui/react';
import { restoreAuthSession } from 'redux/actions/authActions';
import { useQuery } from 'utils/hooks';

const Gateway = ({ children, auth, restoreAuthSession }) => {
    const redirectURL = useQuery('redirect') || '/app';
    const [checkStatus, setCheckStatus] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setTimeout(() => {
                if (user) restoreAuthSession(user);
                setCheckStatus('COMPLETED');
            }, 500);
        });
    }, []);

    const getRenderOutput = () => {
        if (auth.isLoggedIn === null && checkStatus === null) {
            return (
                <Box
                    width='100vw'
                    height='100vh'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    backgroundColor='navy.600'
                >
                    <Spinner size='xl' thickness='6px' color='cyan.500' />
                </Box>
            );
        } else if (auth.isLoggedIn === null && checkStatus === 'COMPLETED') {
            return children;
        }
    };

    return auth.isLoggedIn ? <Navigate to={redirectURL} /> : getRenderOutput();
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { restoreAuthSession })(Gateway);
