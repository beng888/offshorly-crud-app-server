import { RequestHandler } from 'express';

export default function validateDto(validator: any): RequestHandler {
  return (req, res, next) => {
    const valid = validator(req.body);
    if (!valid) {
      const { errors } = validator;
      next({ errors, code: 500 });
    }
    next();
  };
}
