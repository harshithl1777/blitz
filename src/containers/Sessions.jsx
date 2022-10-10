import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { doc, onSnapshot } from 'firebase/firestore';
import {
    Box,
    Button,
    Heading,
    Link,
    Text,
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
} from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import { IoArrowUp, IoArrowDown } from 'react-icons/io5';
import db from 'index';
import { updateActiveSessions, startSession, endSession } from 'redux/actions/sessionsActions';
import { refreshClassList } from 'redux/actions/classesActions';
import theme from 'config/theme';
import { Record } from 'components';
import noDataImage from 'assets/images/noData.svg';
import styles from 'containers/Sessions.module.css';

const Sessions = (props) => {
    const { auth, classes, sessions, realtime, updateActiveSessions, startSession, endSession, refreshClassList } = props;
    const [startSessionSubmitted, setStartSessionSubmitted] = useState(false);
    const [endSessionSubmitted, setEndSessionSubmitted] = useState(false);
    const [realtimeSubscribed, setRealtimeSubscribed] = useState(false);
    const { toast } = createStandaloneToast({ theme });

    // Filter through active sessions and find currently selected one
    const selectedActiveSession = sessions.activeSessions.filter((session) => session.classID === classes.selectedClass.id);

    useEffect(() => {
        if (sessions.activeClasses.includes(classes.selectedClass.id) && !realtimeSubscribed) {
            const selectedActiveSession = sessions.activeSessions.filter(
                (session) => session.classID === classes.selectedClass.id
            );
            const unsubscribe = onSnapshot(doc(db, 'sessions', selectedActiveSession[0].id), (doc) => {
                updateActiveSessions(sessions.activeSessions, { ...doc.data(), id: doc.id });
            });
            setRealtimeSubscribed(true);
        }
    }, [realtime]);

    const onStartSession = async () => {
        if (sessions.activeSessions.length >= 1) {
            toast({
                title: 'Another attendance session is active',
                description: 'Please end the session before starting another.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        } else {
            setStartSessionSubmitted(true);
            await startSession(auth.email, classes.selectedClass.id);
            setTimeout(() => {
                setStartSessionSubmitted(false);
            }, 500);
        }
    };

    const onEndSession = async () => {
        setEndSessionSubmitted(true);
        await endSession(selectedActiveSession[0].id, auth.email);
        await refreshClassList(auth.email);
        setTimeout(() => {
            setEndSessionSubmitted(false);
        }, 500);
    };

    const renderActiveSessionsContent = () => {
        if (sessions.activeClasses.includes(classes.selectedClass.id)) {
            const attendance = selectedActiveSession[0].attendance;

            // Return attendance list or placeholder text with code
            if (attendance.length >= 1) {
                return (
                    <Box display='flex' flexDirection='column' gap='4px' marginTop='22px'>
                        {attendance.map((student) => (
                            <Record record={student} key={student.studentID} />
                        ))}
                    </Box>
                );
            } else {
                return (
                    <Box width='100%' marginTop='160px' display='flex' flexDirection='column' alignItems='center'>
                        <Popover placement='right'>
                            <PopoverTrigger>
                                <Box
                                    paddingLeft='20px'
                                    paddingRight='20px'
                                    backgroundColor='gray.200'
                                    height='50px'
                                    fontSize='2xl'
                                    fontWeight='bold'
                                    borderRadius='6px'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    onClick={() => navigator.clipboard.writeText(selectedActiveSession[0].code)}
                                    _hover={{ cursor: 'pointer' }}
                                    letterSpacing='6px'
                                >
                                    {selectedActiveSession[0].code}
                                </Box>
                            </PopoverTrigger>
                            <PopoverContent
                                backgroundColor='navy.600'
                                width='80px'
                                height='30px'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                border='none'
                            >
                                <PopoverArrow backgroundColor='navy.600' />
                                <PopoverBody color='white' fontSize='sm' fontWeight='semibold'>
                                    Copied!
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                        <Heading fontSize='xl' marginTop='20px'>
                            Active session started..
                        </Heading>
                        <Text width='400px' textAlign='center' marginTop='5px' fontWeight='normal' color='gray.500'>
                            Give the above code to your students and ask them to navigate to{' '}
                            <Link fontWeight='bold' color='cyan.500' href='/students'>
                                blitz.netlify.app/students
                            </Link>
                            .
                        </Text>
                    </Box>
                );
            }
        } else {
            return (
                <Box display='flex' flexDirection='column' alignItems='center' width='100%' marginTop='140px'>
                    <Image src={noDataImage} alt='blank clipboards' />
                    <Heading fontSize='xl' marginTop='20px'>
                        No currently active sessions
                    </Heading>
                    <Text width='400px' textAlign='center' marginTop='5px' fontWeight='normal' color='gray.500'>
                        You don’t have any active attendance sessions. Try clicking{' '}
                        <span style={{ fontWeight: 'bold' }}>start sessions</span> to get one going!
                    </Text>
                </Box>
            );
        }
    };

    return (
        <Box width='100%'>
            <Box display='flex' flexDirection='row'>
                <Box>
                    <Box display='flex' flexDirection='row' alignItems='center' gap='10px'>
                        <Heading fontSize='xl' color='navy.600'>
                            Active sessions
                        </Heading>
                        {selectedActiveSession.length >= 1 && (
                            <Box
                                paddingLeft='10px'
                                paddingRight='10px'
                                height='25px'
                                backgroundColor='orange.400'
                                color='white'
                                display='flex'
                                flexDirection='row'
                                alignItems='center'
                                gap='10px'
                                borderRadius='6px'
                                fontSize='xs'
                                fontWeight='semibold'
                            >
                                <div className={styles.pointer} />
                                {selectedActiveSession[0].attendance.length}{' '}
                                {selectedActiveSession[0].attendance.length === 1 ? 'student' : 'students'}
                            </Box>
                        )}
                    </Box>
                    <Text fontSize='sm' color='gray.500'>
                        Ongoing attendance sessions will show up here.
                    </Text>
                </Box>
                <Box margin='auto' marginRight='0px' display='flex' flexDirection='row' gap='10px'>
                    {selectedActiveSession.length >= 1 && (
                        <Popover placement='bottom'>
                            <PopoverTrigger>
                                <Box
                                    paddingLeft='20px'
                                    paddingRight='20px'
                                    backgroundColor='gray.200'
                                    height='40px'
                                    fontSize='lg'
                                    fontWeight='bold'
                                    borderRadius='6px'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    onClick={() => navigator.clipboard.writeText(selectedActiveSession[0].code)}
                                    _hover={{ cursor: 'pointer' }}
                                    letterSpacing='6px'
                                >
                                    {selectedActiveSession[0].code}
                                </Box>
                            </PopoverTrigger>
                            <PopoverContent
                                backgroundColor='navy.600'
                                width='80px'
                                height='30px'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                border='none'
                            >
                                <PopoverArrow backgroundColor='navy.600' />
                                <PopoverBody color='white' fontSize='sm' fontWeight='semibold'>
                                    Copied!
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    )}
                    {selectedActiveSession.length >= 1 ? (
                        <Button
                            leftIcon={<IoArrowDown />}
                            variant='primary'
                            backgroundColor='red.500'
                            _hover={{ backgroundColor: 'red.600' }}
                            _loading={{ backgroundColor: 'red.600' }}
                            isLoading={endSessionSubmitted}
                            onClick={onEndSession}
                        >
                            End session
                        </Button>
                    ) : (
                        <Button
                            leftIcon={<IoArrowUp />}
                            variant='primary'
                            backgroundColor='teal.400'
                            _hover={{ backgroundColor: 'teal.500' }}
                            isLoading={startSessionSubmitted}
                            _loading={{ backgroundColor: 'teal.500' }}
                            onClick={onStartSession}
                        >
                            Start session
                        </Button>
                    )}
                </Box>
            </Box>
            {renderActiveSessionsContent()}
        </Box>
    );
};

const mapStateToProps = ({ auth, classes, sessions, realtime }) => ({ auth, classes, sessions, realtime });

export default connect(mapStateToProps, { updateActiveSessions, startSession, endSession, refreshClassList })(Sessions);
