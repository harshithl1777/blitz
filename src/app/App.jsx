import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createStandaloneToast } from '@chakra-ui/toast';
import { HomePage, LandingPage, StudentsPage, Error404Page } from 'pages';
import { Protected, Gateway } from 'components';
import theme from 'config/theme';
import Fonts from 'config/fonts';
import 'app/global.css';

const { ToastContainer } = createStandaloneToast({ theme });

const App = () => {
    return (
        <>
            <ChakraProvider theme={theme}>
                <Fonts />
                <Router>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <Gateway>
                                    <LandingPage />
                                </Gateway>
                            }
                        />
                        <Route
                            path='/auth'
                            element={
                                <Gateway>
                                    <LandingPage />
                                </Gateway>
                            }
                        />
                        <Route
                            path='/app'
                            element={
                                <Protected>
                                    <HomePage />
                                </Protected>
                            }
                        />
                        <Route path='/students' element={<StudentsPage />} />
                        <Route path='*' element={<Error404Page />} />
                    </Routes>
                </Router>
                <ToastContainer />
            </ChakraProvider>
        </>
    );
};

export default App;
