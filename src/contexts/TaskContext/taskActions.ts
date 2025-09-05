import type { TaskModel } from '../../models/TaskModel';
import type { TaskStateModel } from '../../models/TaskStateModel';

// export const TaskActionTypes = {
//   START_TASK: 'START_TASK',
//   STOP_TASK: 'STOP_TASK',
//   COMPLETE_TASK: 'COMPLETE_TASK',
//   COUNTDOWN: 'COUNTDOW',
//   RESET_STATE: 'RESET_STATE',
// } as const;

// export type TaskActionTypes = typeof TaskActionTypes[keyof typeof TaskActionTypes];

// export type TaskActionType = {
//   type: TaskActionTypes;
//   payload?: TaskModel;
// }

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  STOP_TASK: 'STOP_TASK',
  RESET_STATE: 'RESET_STATE',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETE_TASK: 'COMPLETE_TASK',
  CHANGE_SETTINGS: 'CHANGE_SETTINGS',
} as const;

export type TaskActionsWithPayload =
  | {
      type: typeof TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: typeof TaskActionTypes.COUNT_DOWN;
      // payload: { secondsRemaining: number }; // EXACTLY THE SAME
      payload: Pick<TaskStateModel,'secondsRemaining'>;
    }
  | {
    type: typeof TaskActionTypes.CHANGE_SETTINGS;
    payload: TaskStateModel['config'];
  };
export type TaskActionsWithoutPayload =
  | {
      type: typeof TaskActionTypes.RESET_STATE;
    }
  | {
      type: typeof TaskActionTypes.STOP_TASK;
    }
  | {
      type: typeof TaskActionTypes.COMPLETE_TASK;
    };

export type TaskActionType =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;
