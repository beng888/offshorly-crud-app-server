import { JSONSchemaType } from 'ajv';
import ajvInstance from '.';
import { User } from '../types';

const schema: JSONSchemaType<User> = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

export default ajvInstance.compile(schema);
