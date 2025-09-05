import type { TaskModel } from '../models/TaskModel';

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  if (task.completeDate) return 'Completed';
  if (task.interruptDate) return 'Interrupted';
  if (task.id === activeTask?.id) return 'In progress';
  return 'Abandoned';
}
