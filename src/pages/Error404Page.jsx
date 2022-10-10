import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { IoArrowForward } from 'react-icons/io5';

const Error404Page = () => {
    return (
        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Heading size='2xl' color='navy.600'>
                    Error 404
                </Heading>
                <Text fontSize='md' width='550px' textAlign='center' marginTop='10px'>
                    Hmm...that page doesn't exist. It looks like you've reached{' '}
                    <span style={{ fontWeight: 'bold' }}>uncharted territory</span>. Perhaps go back to where you were and try
                    something else?
                </Text>
                <Button
                    variant='primary'
                    marginTop='20px'
                    size='lg'
                    onClick={() => {
                        window.location.href = '/';
                    }}
                    rightIcon={<IoArrowForward size={20} />}
                >
                    Back to known land
                </Button>
            </Box>
        </Box>
    );
};

export default Error404Page;
