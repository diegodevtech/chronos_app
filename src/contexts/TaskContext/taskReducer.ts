import type { TaskModel } from '../../models/TaskModel';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecToMin } from '../../utils/formatSecToMin';
import { getNextCycle } from '../../utils/getNextCycle';
import { initialStateValue } from './initialStateValue';
// import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes, type TaskActionType } from './taskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionType,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload as TaskModel;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecToMin(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }

    case TaskActionTypes.STOP_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    }

    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.RESET_STATE:
      // return { ...initialStateValue };
      // return {
      //   ...state,
      //   tasks: [],
      //   currentCycle: 0,
      //   activeTask: null,
      //   secondsRemaining: 0,
      //   formattedSecondsRemaining: '00:00',
      // };
      return {
        ...initialStateValue, config: {...state.config}
      }

    case TaskActionTypes.CHANGE_SETTINGS:
      return { ...state, config: { ...action.payload } };

    case TaskActionTypes.COUNT_DOWN: {
      const secondsRemaining = action.payload.secondsRemaining;
      const formattedSecondsRemaining = formatSecToMin(secondsRemaining);
      return {
        ...state,
        secondsRemaining,
        formattedSecondsRemaining,
      };
    }

    default:
      return {} as TaskStateModel;
  }
}
