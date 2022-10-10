import { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Box, Heading, Text, Input, Checkbox, Divider } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import { IoAdd } from 'react-icons/io5';
import { newClass } from 'redux/actions/classesActions';
import theme from 'config/theme';

const CreateClassModal = (props) => {
    const { auth, newClass, onClose } = props;
    const [className, setClassName] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { toast } = createStandaloneToast({ theme });

    const onCreateClassModalSubmit = async () => {
        const classNameRegex = /^[A-Za-z0-9_ @./#&'+-]{3,20}$/;
        if (classNameRegex.test(className)) {
            setFormSubmitted(true);
            await newClass(className, auth.email, onClose);
            setFormSubmitted(false);
        } else {
            toast({
                title: 'Invalid class name',
                description: 'Class names must be 3-20 characters long.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    return (
        <Box width='420px' display='flex' flexDirection='column' alignItems='center' marginTop='44px'>
            <Heading as='b'>Create a new class</Heading>
            <Text textAlign='center' marginTop='12px'>
                To create a new class, just enter the name of your class below. Ideally, it should be the course code.
            </Text>
            <Input
                size='lg'
                backgroundColor='gray.100'
                border='none'
                color='navy.600'
                _focusVisible={{ borderColor: 'var(--chakra-colors-cyan-500)' }}
                placeholder='Class name / course code'
                marginTop='22px'
                onChange={(e) => setClassName(e.target.value)}
                value={className}
            />
            <Button
                isLoading={formSubmitted}
                onClick={onCreateClassModalSubmit}
                width='100%'
                size='lg'
                variant='primary'
                marginTop='20px'
                marginBottom='35px'
                leftIcon={<IoAdd color='white' size={20} />}
            >
                Create class
            </Button>
        </Box>
    );
};

const mapStateToProps = ({ auth, classes }) => ({ auth });

export default connect(mapStateToProps, { newClass })(CreateClassModal);
