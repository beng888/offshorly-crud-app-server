import { Router } from 'express';

import { loginUser, revalidateUser, logoutUser } from '../controller/users';
import guard from '../middleware/guard';
import validateDto from '../middleware/validate-dto';
import user from '../validators/user';

const router = Router();

router.route('/').post(validateDto(user), loginUser).get(guard, revalidateUser);
router.route('/logout').get(logoutUser);

export default router;
