import { CookieOptions, RequestHandler, Response } from 'express';
import { Users } from '../models/users';
import argon from 'argon2';
import { Http2ServerResponse } from 'http2';
import { Todos } from '../models/todos';
const { sign } = require('jsonwebtoken');

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser: Users | null = await Users.findOne({ include: [Todos], where: { email } });

    if (existingUser) {
      if (await argon.verify(existingUser.password, password)) {
        return sendToken(existingUser, 200, res, `${email} logged in successfully!`);
      } else {
        res.status(400).json({ message: 'Wrong Password' });
      }
    }

    const hash = await argon.hash(password);
    await Users.create({ email, password: hash });
    const user = await Users.findOne({ include: [Todos], where: { email } });

    sendToken(user as Users, 201, res, `${email} registered successfully!`);
  } catch (error) {
    next(error);
  }
};

export const logoutUser: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie(process.env.ACCESS_TOKEN_NAME!, {
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ message: 'Logged out successfully!' });
  } catch (error) {
    next(error);
  }
};

export const revalidateUser: RequestHandler = async (req: any, res, next) => {
  try {
    if (req.user) sendToken(req.user, 200, res);
  } catch (error) {
    next(error);
  }
};

const sendToken = (
  user: Users,
  statusCode: Http2ServerResponse['statusCode'],
  res: Response,
  message?: string,
) => {
  const token = sign({ email: user.email, id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d',
  });

  const options = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
    secure: process.env.NODE_ENV === 'production',
    httpOnly: process.env.NODE_ENV === 'production',
  };

  user.password = '';

  res
    .cookie(process.env.ACCESS_TOKEN_NAME!, token, options as CookieOptions)
    .status(statusCode)
    .json({ user, message });
};
