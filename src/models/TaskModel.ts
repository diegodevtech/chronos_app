import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null;
  interruptDate: number | null;
  // type: 'workTime' | 'shortBreakTime' | 'longBreakTime';
  // up == EXACTLY THE SAME BUT MORE PERFORMATIC == down
  type: keyof TaskStateModel['config'];
};