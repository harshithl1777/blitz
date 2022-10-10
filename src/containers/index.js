export { default as AuthModal } from 'containers/AuthModal';
export { default as Sidebar } from 'containers/Sidebar';
export { default as CreateClassModal } from 'containers/CreateClassModal';
export { default as Sessions } from 'containers/Sessions';
export { default as History } from 'containers/History';

const defaultImportError = () => {
    console.error('Container imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
