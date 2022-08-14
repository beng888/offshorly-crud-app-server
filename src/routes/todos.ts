import { Router } from 'express';

import { addTodo, deleteTodo, updateTodo } from '../controller/todos';
import validateDto from '../middleware/validate-dto';
import { addTodoValidator, updateTodoValidator } from '../validators/todo';

const router = Router();

router.route('/').post(validateDto(addTodoValidator), addTodo);
router.route('/:id').put(validateDto(updateTodoValidator), updateTodo).delete(deleteTodo);

export default router;
