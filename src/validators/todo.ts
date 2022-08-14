import { JSONSchemaType } from 'ajv';
import ajvInstance from '.';

interface Todo {
  title: string;
  description: string;
  done: boolean;
}

const schema = (props?: Partial<JSONSchemaType<Todo>>): JSONSchemaType<Todo> => ({
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 4, maxLength: 50 },
    description: { type: 'string', minLength: 4 },
    done: { type: 'boolean' },
  },
  required: [],
  additionalProperties: false,
  ...props,
});

export const addTodoValidator = ajvInstance.compile(schema({ required: ['title'] }));
export const updateTodoValidator = ajvInstance.compile(
  schema({
    anyOf: [
      {
        required: ['description'],
        properties: { description: { type: 'string', minLength: 4 } },
      },
      {
        required: ['done'],
        properties: { done: { type: 'boolean' } },
      },
    ],
  }),
);
