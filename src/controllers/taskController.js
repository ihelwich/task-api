import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  try {
      const completed = req.query.completed;

      if (
        completed !== undefined &&
        completed !== 'true' &&
        completed !== 'false'
      ) {
        return res.status(400).json({
          error: 'Query parameter completed must be true or false'
        });
      }

    const filter = completed === undefined ? undefined : completed === 'true'
    const tasks = await taskService.getAllTasks(filter);
    res.json(tasks);
  } catch (error) {
    next(error)
  }
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}
