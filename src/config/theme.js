import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: `'Graphik', sans-serif`,
        body: `'Graphik', sans-serif`,
    },
    colors: {
        navy: {
            600: '#051220',
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'bold', // Normally, it is "semibold"
            },
            variants: {
                primary: {
                    bg: 'cyan.500',
                    color: 'white',
                    _hover: {
                        bg: 'cyan.600',
                    },
                    _loading: {
                        bg: 'cyan.400',
                        _hover: {
                            bg: 'cyan.400',
                        },
                    },
                },
                secondary: {
                    bg: 'transparent',
                    color: 'white',
                    border: '1px',
                    _hover: {
                        bg: 'gray.800',
                    },
                },
            },
            defaultProps: {
                colorScheme: 'green',
            },
        },
    },
});

export default theme;
