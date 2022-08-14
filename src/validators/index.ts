import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';

const ajvInstance = new Ajv({ allErrors: true });
ajvFormats(ajvInstance);

export default ajvInstance;
