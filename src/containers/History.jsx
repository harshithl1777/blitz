import { connect } from 'react-redux';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { Record } from 'components';
import { convertDateTime } from 'utils/helpers';
import noDataImage from 'assets/images/noData.svg';

const History = (props) => {
    const { classes } = props;
    const selectedClassHistory = classes.classList.filter((singleClass) => singleClass.id === classes.selectedClass.id)[0]
        .history;

    const renderHistory = () =>
        selectedClassHistory.map((historyRecord, index) => (
            <Box display='flex' flexDirection='column' gap='35px' marginTop={index !== 0 && '31px'} key={historyRecord.startedAt}>
                <Box>
                    <Heading fontSize='lg' color='navy.600'>
                        {convertDateTime(historyRecord.startedAt)}
                    </Heading>
                    <Text fontSize='sm' color='gray.500'>
                        On this day, {historyRecord.attendance.length}{' '}
                        {historyRecord.attendance.length === 1 ? 'student' : 'students'} came to class.
                    </Text>
                    <Box display='flex' flexDirection='column' gap='4px' marginTop='14px'>
                        {historyRecord.attendance.map((student) => (
                            <Record record={student} key={student.studentID} />
                        ))}
                    </Box>
                </Box>
            </Box>
        ));

    return selectedClassHistory.length >= 1 ? (
        renderHistory()
    ) : (
        <Box display='flex' flexDirection='column' alignItems='center' width='100%' marginTop='140px'>
            <Image src={noDataImage} alt='blank clipboards' />
            <Heading fontSize='xl' marginTop='20px'>
                No history found
            </Heading>
            <Text width='400px' textAlign='center' marginTop='5px' fontWeight='normal' color='gray.500'>
                You don’t have any existing attendance history. Try <span style={{ fontWeight: 'bold' }}>starting a session</span>{' '}
                to see some appear!
            </Text>
        </Box>
    );
};

const mapStateToProps = ({ auth, classes }) => ({ auth, classes });

export default connect(mapStateToProps, {})(History);
