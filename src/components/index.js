export { default as Protected } from 'components/Protected';
export { default as Gateway } from 'components/Gateway';
export { default as Record } from 'components/Record';

const defaultImportError = () => {
    console.error('Component imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
