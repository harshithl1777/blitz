import { useState } from 'react';
import { Box, Heading, Image, Text, Input, Button } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import { IoArrowForward, IoLogoGithub, IoLogoDribbble, IoLogoLinkedin } from 'react-icons/io5';
import { retrieveSessionsByCode, addSessionAttendanceRecord } from 'utils/models/sessions';
import { retrieveClassByID } from 'utils/models/classes';
import theme from 'config/theme';
import logoLight from 'assets/icons/logo-light.svg';
import checkmarkGreen from 'assets/icons/checkmark-green.svg';

const StudentsPage = () => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [studentID, setStudentID] = useState('');
    const [className, setClassName] = useState(null);
    const [sessionID, setSessionID] = useState(null);
    const [continueLoading, setContinueLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [step, setStep] = useState(0);
    const { toast } = createStandaloneToast({ theme });

    const continueClicked = async () => {
        const codeRegex = /^[0-9]{6,6}$/;
        if (codeRegex.test(code)) {
            setContinueLoading(true);
            const matchingSessions = await retrieveSessionsByCode(parseInt(code));
            if (matchingSessions.length >= 1) {
                setTimeout(async () => {
                    const matchingClass = await retrieveClassByID(matchingSessions[0].classID);
                    console.log(matchingClass);
                    setSessionID(matchingSessions[0].id);
                    setClassName(matchingClass.name);
                    setStep(1);
                }, 500);
            } else {
                setTimeout(() => {
                    toast({
                        title: 'Invalid code',
                        description: 'Your code does not match any sessions.',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                        position: 'top-right',
                    });
                    setContinueLoading(false);
                }, 500);
            }
        } else {
            toast({
                title: 'Invalid code',
                description: 'Codes must be six-digit numbers.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    const submitAttendance = () => {
        const studentIDRegex = /^[A-Za-z0-9 _@$#./|']{2,30}$/;
        if (name.length >= 1) {
            if (studentIDRegex.test(studentID)) {
                setSubmitLoading(true);
                setTimeout(async () => {
                    await addSessionAttendanceRecord(sessionID, name, studentID, Date.now());
                    setSubmitLoading(false);
                    setStep(2);
                }, 500);
            } else {
                toast({
                    title: 'Invalid student ID',
                    description: 'Student IDs must be between 3 - 30 characters.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
        } else {
            toast({
                title: 'Missing name field',
                description: 'Please fill the name field out.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    const renderContent = () => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Image src={logoLight} alt='blitz logo' width='50px' height='50px' />
                        <Heading fontSize='4xl' color='navy.600' width='540px' textAlign='center' marginTop='32px'>
                            Enter your instructor’s attendance code below.
                        </Heading>
                        <Text fontSize='md' color='navy.600' width='510px' textAlign='center' marginTop='10px'>
                            Your instructor should have given you an attendance code. Enter it below. Afterwards, you’ll be able
                            to enter your email and student ID.
                        </Text>
                        <Input
                            backgroundColor='gray.100'
                            border='none'
                            color='navy.600'
                            _focusVisible={{ borderColor: 'var(--chakra-colors-cyan-500)' }}
                            size='lg'
                            placeholder='Enter your six-digit code'
                            marginTop='16px'
                            fontWeight='bold'
                            textAlign='center'
                            letterSpacing='6px'
                            _placeholder={{ fontWeight: 'medium', letterSpacing: '0' }}
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
                        ></Input>
                        <Button
                            rightIcon={<IoArrowForward size={20} />}
                            width='100%'
                            size='lg'
                            variant='primary'
                            marginTop='25px'
                            marginBottom='100px'
                            onClick={continueClicked}
                            isLoading={continueLoading}
                        >
                            Continue
                        </Button>
                    </>
                );
            case 1:
                return (
                    <>
                        <Image src={logoLight} alt='blitz logo' width='50px' height='50px' />
                        <Heading fontSize='4xl' color='navy.600' width='430px' textAlign='center' marginTop='32px'>
                            Recording attendance for {className}
                        </Heading>
                        <Text fontSize='md' color='navy.600' width='530px' textAlign='center' marginTop='10px'>
                            We’ve found your class, <span style={{ fontWeight: 'bold' }}>{className}</span>! Enter your full name
                            and student ID below to be marked as present in your class’s attendance.
                        </Text>
                        <Input
                            backgroundColor='gray.100'
                            border='none'
                            color='navy.600'
                            _focusVisible={{ borderColor: 'var(--chakra-colors-cyan-500)' }}
                            size='lg'
                            placeholder='Full name'
                            marginTop='25px'
                            fontWeight='medium'
                            _placeholder={{ fontWeight: 'medium' }}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        ></Input>
                        <Input
                            backgroundColor='gray.100'
                            border='none'
                            color='navy.600'
                            _focusVisible={{ borderColor: 'var(--chakra-colors-cyan-500)' }}
                            size='lg'
                            placeholder='Student ID'
                            marginTop='16px'
                            fontWeight='medium'
                            _placeholder={{ fontWeight: 'medium' }}
                            onChange={(e) => setStudentID(e.target.value)}
                            value={studentID}
                        ></Input>
                        <Button
                            rightIcon={<IoArrowForward size={20} />}
                            width='100%'
                            size='lg'
                            variant='primary'
                            marginTop='25px'
                            marginBottom='100px'
                            isLoading={submitLoading}
                            onClick={submitAttendance}
                        >
                            Mark me as present
                        </Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <Image src={checkmarkGreen} alt='blitz logo' width='65px' height='65px' />
                        <Heading fontSize='4xl' color='navy.600' width='540px' textAlign='center' marginTop='32px'>
                            Great, your attendance has been submitted!
                        </Heading>
                        <Text fontSize='md' color='navy.600' width='510px' textAlign='center' marginTop='10px'>
                            We’ve noted down that you were in class today and your instructor should receive it momentarily. Come
                            back at your next class to submit again!
                        </Text>
                        <Button
                            rightIcon={<IoArrowForward size={20} />}
                            width='100%'
                            size='lg'
                            variant='primary'
                            marginTop='25px'
                            marginBottom='100px'
                            onClick={() => {
                                window.location.href = '/';
                            }}
                        >
                            Back to the home page
                        </Button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Box width='100vw' height='100vh' backgroundColor='white' display='flex' alignItems='center' justifyContent='center'>
            <Box display='flex' flexDirection='column' alignItems='center'>
                {renderContent()}
                <Box
                    position='absolute'
                    bottom='0'
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='center'
                    height='80px'
                    width='100%'
                >
                    <Text color='navy.600' fontSize='lg' margin='auto' marginLeft='40px'>
                        Built by <span style={{ fontWeight: 'var(--chakra-fontWeights-black' }}>Harshith Latchupatula.</span>
                    </Text>
                    <Box display='flex' flexDirection='row' alignItems='center' gap='20px' margin='auto' marginRight='30px'>
                        <IoLogoDribbble color='#051220' size={24} />
                        <IoLogoLinkedin color='#051220' size={24} />
                        <IoLogoGithub color='#051220' size={24} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default StudentsPage;
