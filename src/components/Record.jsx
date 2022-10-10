import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { convertDateTime } from 'utils/helpers';
import checkmarkGreen from 'assets/icons/checkmark-green.svg';

const Record = ({ record }) => {
    return (
        <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            height='50px'
            backgroundColor='white'
            border='1px solid #E2E8F0'
            borderRadius='8px'
            boxShadow='0px 2px 4px rgba(237, 242, 247, 0.7)'
        >
            <Image src={checkmarkGreen} alt='green checkmark' marginLeft='20px' width='23px' />
            <Heading marginLeft='22px' fontSize='md'>
                {record.name}
            </Heading>
            <Heading fontSize='md' color='gray.400' marginLeft='11px'>
                /
            </Heading>
            <Heading fontSize='md' color='gray.400' marginLeft='11px'>
                {record.studentID}
            </Heading>
            <Text fontSize='md' fontWeight='medium' color='gray.500' margin='auto' marginRight='20px'>
                {convertDateTime(record.timestamp.seconds)}
            </Text>
        </Box>
    );
};

export default Record;
