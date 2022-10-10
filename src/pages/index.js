export { default as LandingPage } from 'pages/LandingPage';
export { default as HomePage } from 'pages/HomePage';
export { default as StudentsPage } from 'pages/StudentsPage';
export { default as Error404Page } from 'pages/Error404Page';

const defaultImportError = () => {
    console.error('Page imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
