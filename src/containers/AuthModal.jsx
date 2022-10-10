import { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button, Box, Heading, Text, Input, Checkbox, Divider } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import { IoLogoGithub, IoLogoGoogle, IoLogoMicrosoft } from 'react-icons/io5';
import { authWithSocials, authWithCredentials } from 'redux/actions/authActions';
import { useQuery } from 'utils/hooks';
import theme from 'config/theme';

const AuthModal = (props) => {
    const { auth, authWithSocials, authWithCredentials } = props;
    const redirectURL = useQuery('redirect') || '/app';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { toast } = createStandaloneToast({ theme });

    const onAuthModalSubmit = async () => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (emailRegex.test(email)) {
            if (passwordRegex.test(password)) {
                setFormSubmitted(true);
                await authWithCredentials(email, password);
                setFormSubmitted(false);
            } else {
                toast({
                    title: 'Insecure password',
                    description: 'Use at least 8 letters, 1 number, 1 uppercase and 1 lowercase letter.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
        } else {
            toast({
                title: 'Invalid email',
                description: 'Emails must be in the abc@abc.com format.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    const onAuthModalSocialsSubmit = async (service) => {
        setFormSubmitted(true);
        await authWithSocials(service);
        setFormSubmitted(false);
    };

    return auth.isLoggedIn ? (
        <Navigate to={redirectURL} />
    ) : (
        <Box width='420px' display='flex' flexDirection='column' alignItems='center' marginTop='44px'>
            <Heading as='b'>Welcome to Blitz</Heading>
            <Text textAlign='center' marginTop='12px'>
                Taking attendance doesn’t have to be so slow and tedious. With Blitz, it’s never been easier.
            </Text>
            <Input
                size='lg'
                backgroundColor='gray.100'
                border='none'
                color='navy.600'
                _focusVisible={{ borderColor: 'var(--chakra-colors-cyan-500)' }}
                placeholder='Email address'
                marginTop='22px'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <Input
                backgroundColor='gray.100'
                border='none'
                color='navy.600'
                _focusVisible={{ borderColor: 'var(--chakra-colors-cyan-500)' }}
                size='lg'
                placeholder='Password'
                marginTop='16px'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
            ></Input>
            <Box display='flex' flexDirection='row' alignItems='center' marginTop='28px' gap='10px'>
                <Checkbox size='lg' colorScheme='cyan' />
                <Text fontSize='sm'>I agree to the Terms and Conditions and Privacy Policy.</Text>
            </Box>
            <Button
                isLoading={formSubmitted}
                onClick={onAuthModalSubmit}
                width='100%'
                size='lg'
                variant='primary'
                marginTop='20px'
            >
                Login or Sign up for Blitz
            </Button>
            <Divider marginTop='23px' orientation='horizontal' borderColor='gray.300' />
            <Box display='flex' flexDirection='row' alignItems='center' marginTop='23px' marginBottom='42px' gap='15px'>
                <Button
                    onClick={() => onAuthModalSocialsSubmit('GOOGLE')}
                    leftIcon={<IoLogoGoogle color='white' size={22} />}
                    size='md'
                    colorScheme='red'
                >
                    Google
                </Button>
                <Button
                    onClick={() => onAuthModalSocialsSubmit('MICROSOFT')}
                    leftIcon={<IoLogoMicrosoft color='white' size={22} />}
                    size='md'
                    backgroundColor='blue.500'
                    _hover={{ backgroundColor: 'blue.600' }}
                >
                    Microsoft
                </Button>
                <Button
                    onClick={() => onAuthModalSocialsSubmit('GITHUB')}
                    leftIcon={<IoLogoGithub color='white' size={22} />}
                    size='md'
                    backgroundColor='black'
                    _hover={{ backgroundColor: 'blackAlpha.800' }}
                >
                    Github
                </Button>
            </Box>
        </Box>
    );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { authWithSocials, authWithCredentials })(AuthModal);
