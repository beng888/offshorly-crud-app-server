import { Users } from '../models/users';

export interface User {
  email: string;
  password: string;
}
export interface UserWithID extends Users {
  id?: any;
}
