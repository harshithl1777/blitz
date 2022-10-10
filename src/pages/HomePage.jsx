import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Box,
    Button,
    Heading,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    useDisclosure,
} from '@chakra-ui/react';
import { IoAdd } from 'react-icons/io5';
import { loadClassList } from 'redux/actions/classesActions';
import { loadActiveSessions } from 'redux/actions/sessionsActions';
import { Sidebar, CreateClassModal, Sessions, History } from 'containers';

const HomePage = (props) => {
    const { auth, classes, sessions, loadClassList, loadActiveSessions } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const renderCreateClassModal = () => (
        <Modal isOpen={isOpen} onClose={onClose} size='lg' motionPreset='slideInBottom' isCentered>
            <ModalOverlay />
            <ModalContent borderRadius='15px' display='flex' alignItems='center' justifyContent='center'>
                <CreateClassModal onClose={onClose} />
            </ModalContent>
        </Modal>
    );

    useEffect(() => {
        setTimeout(() => {
            loadClassList(auth.email);
            loadActiveSessions(auth.email);
        }, 200);
    }, []);

    return (
        <Box width='100vw' height='100vh' display='flex' flexDirection='row'>
            {classes.selectedClass === null || sessions.activeSessions === null ? (
                <Box
                    width='100%'
                    height='100%'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    backgroundColor='navy.600'
                >
                    <Spinner size='xl' thickness='6px' color='cyan.500' />
                </Box>
            ) : (
                <>
                    <Sidebar />
                    <Box backgroundColor='gray.50' flexGrow='1' display='flex' flexDirection='column' alignItems='center'>
                        <Box display='flex' flexDirection='row' alignItems='center' marginTop='45px' width='93%'>
                            <Heading fontSize='3xl'>{classes.selectedClass.name}</Heading>
                            <Button
                                margin='auto'
                                marginRight='0px'
                                width='150px'
                                leftIcon={<IoAdd color='white' size={20} />}
                                variant='primary'
                                size='lg'
                                onClick={onOpen}
                            >
                                New class
                            </Button>
                        </Box>
                        <Tabs colorScheme='cyan' width='93%' marginTop='8px'>
                            <TabList>
                                <Tab fontWeight='semibold' color='gray.400'>
                                    Sessions
                                </Tab>
                                <Tab fontWeight='semibold' color='gray.400'>
                                    History
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel padding='none' overflowY='scroll' maxHeight='550px' marginTop='25px'>
                                    <Sessions />
                                </TabPanel>
                                <TabPanel padding='none' overflowY='scroll' maxHeight='550px' marginTop='31px'>
                                    <History />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        {renderCreateClassModal()}
                    </Box>
                </>
            )}
        </Box>
    );
};

const mapStateToProps = ({ auth, classes, sessions }) => ({ auth, classes, sessions });

export default connect(mapStateToProps, { loadClassList, loadActiveSessions })(HomePage);
