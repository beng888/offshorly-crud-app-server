import { RequestHandler } from 'express';
import { Users } from '../models/users';
import jwt from 'jsonwebtoken';
import { Todos } from '../models/todos';

const guard: RequestHandler = async (req: any, res, next) => {
  const accessToken = req.cookies[process.env.ACCESS_TOKEN_NAME! as any];

  if (!accessToken) {
    return next({ code: 400, message: 'Invalid credentials' });
  }

  try {
    const decoded: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    const user = await Users.findOne({ include: [Todos], where: { id: decoded.id } });
    if (user) {
      req.authenticated = true;
      req.user = user;

      return next();
    }
    res.status(401).json({ message: 'unauthorized' });
  } catch (error) {
    next(error);
  }
};

export default guard;
