import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Box, Heading, Text, Link, Modal, ModalOverlay, ModalContent, useDisclosure, Icon } from '@chakra-ui/react';
import { HiLightningBolt } from 'react-icons/hi';
import { IoArrowForward, IoLogoGithub, IoLogoDribbble, IoLogoLinkedin } from 'react-icons/io5';
import { AuthModal } from 'containers';
import logoDark from 'assets/icons/logo-dark.svg';
import styles from 'pages/LandingPage.module.css';

const LandingPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const showAuthModal = useLocation().pathname.includes('/auth');
    const renderAuthModal = () => (
        <Modal isOpen={isOpen} onClose={onClose} size='lg' motionPreset='slideInBottom' isCentered>
            <ModalOverlay />
            <ModalContent borderRadius='15px' display='flex' alignItems='center' justifyContent='center'>
                <AuthModal />
            </ModalContent>
        </Modal>
    );

    useEffect(() => {
        if (showAuthModal) onOpen();
    }, []);

    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.navigationBar}>
                <div className={styles.navigationLeftContent}>
                    <Box display='flex' flexDirection='row' alignItems='center' marginRight='10px'>
                        <img className={styles.navigationBarLogo} src={logoDark} alt='logo for dark mode' />
                        <Heading marginLeft='15px' color='white' fontWeight='black'>
                            Blitz
                        </Heading>
                    </Box>
                    <Link
                        fontWeight='medium'
                        color='white'
                        fontSize='lg'
                        _hover={{ cursor: 'pointer' }}
                        href='https://github.com/harshithl1777/blitz'
                    >
                        About
                    </Link>
                    <Link
                        fontWeight='medium'
                        color='white'
                        fontSize='lg'
                        _hover={{ cursor: 'pointer' }}
                        href='https://github.com/harshithl1777/blitz'
                    >
                        Github
                    </Link>
                    <Link
                        fontWeight='medium'
                        color='white'
                        fontSize='lg'
                        _hover={{ cursor: 'pointer' }}
                        href='mailto:hello@harshith.dev'
                    >
                        Contact
                    </Link>
                </div>
                <div className={styles.navigationRightContent}>
                    <Button
                        size='lg'
                        variant='secondary'
                        onClick={() => {
                            window.location.href = '/students';
                        }}
                    >
                        For students
                    </Button>
                    <Button
                        onClick={() => {
                            window.location.href = '/auth';
                        }}
                        leftIcon={<HiLightningBolt size={24} />}
                        size='lg'
                        variant='primary'
                    >
                        Join Blitz
                    </Button>
                </div>
            </div>
            <div className={styles.landingContent}>
                <Heading size='3xl' width='800px' color='white' textAlign='center'>
                    Meet{' '}
                    <span style={{ color: 'var(--chakra-colors-cyan-500)', fontWeight: 'var(--chakra-fontWeights-black' }}>
                        Blitz
                    </span>
                    . Attendance has never been{' '}
                    <span style={{ color: 'var(--chakra-colors-cyan-500)', fontWeight: 'var(--chakra-fontWeights-black' }}>
                        this fast
                    </span>
                    .
                </Heading>
                <Text fontSize='lg' width='700px' textAlign='center' marginTop='10px' color='white'>
                    With Blitz, attendance becomes easier than ever before. Whether you’ve got 30 students or 1000, we’ve got your
                    back no matter what.
                </Text>
                <Box display='flex' flexDirection='row' alignItems='center' gap='20px' marginTop='20px'>
                    <Button
                        onClick={() => {
                            window.location.href = '/auth';
                        }}
                        rightIcon={<IoArrowForward size={24} />}
                        size='lg'
                        variant='primary'
                    >
                        Get started
                    </Button>
                    <Button
                        size='lg'
                        variant='secondary'
                        onClick={() => {
                            window.location.href = '/students';
                        }}
                    >
                        Enter a code
                    </Button>
                </Box>
            </div>
            <div className={styles.footerBar}>
                <Text color='white' fontSize='lg' margin='auto' marginLeft='40px'>
                    Built by <span style={{ fontWeight: 'var(--chakra-fontWeights-black' }}>Harshith Latchupatula.</span>
                </Text>
                <Box display='flex' flexDirection='row' alignItems='center' gap='20px' margin='auto' marginRight='30px'>
                    <Icon
                        as={IoLogoDribbble}
                        _hover={{ filter: 'brightness(80%)', cursor: 'pointer' }}
                        color='white'
                        width='24px'
                        height='24px'
                        onClick={() => window.open('https://dribbble.com/harshithl1777')}
                    />
                    <Icon
                        as={IoLogoLinkedin}
                        color='white'
                        _hover={{ filter: 'brightness(90%)', cursor: 'pointer' }}
                        width='24px'
                        height='24px'
                        onClick={() => window.open('https://linkedin.com/in/harshithlatchupatula')}
                    />
                    <Icon
                        as={IoLogoGithub}
                        _hover={{ filter: 'brightness(90%)', cursor: 'pointer' }}
                        color='white'
                        width='24px'
                        height='24px'
                        onClick={() => window.open('https://github.com/harshithl1777')}
                    />
                </Box>
            </div>
            {renderAuthModal()}
        </div>
    );
};

export default LandingPage;
