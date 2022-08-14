import { RequestHandler } from 'express';

import { Todos } from '../models/todos';

export const addTodo: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = req.user?.id;
    const todos = await Todos.create({ ...req.body, userId });
    return res.status(200).json({ message: 'todo added successfully', data: todos });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo: RequestHandler = async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo: Todos | null = await Todos.findByPk(id);
    if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
    await Todos.destroy({ where: { id } });
    return res.status(200).json({ message: 'Todo deleted successfully', data: deletedTodo });
  } catch (error) {
    next(error);
  }
};

export const updateTodo: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Todos.update({ ...req.body }, { where: { id } });
    const updatedTodo: Todos | null = await Todos.findByPk(id);
    return res.status(200).json({ message: 'Todo updated successfully', data: updatedTodo });
  } catch (error) {
    next(error);
  }
};
