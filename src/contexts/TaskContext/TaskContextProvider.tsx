import { useEffect, useReducer, useRef } from 'react';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { loadBeep } from '../../utils/loadBeep';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskContext } from './TaskContext';
import { initialStateValue } from './initialStateValue';
import { TaskActionTypes } from './taskActions';
import { taskReducer } from './taskReducer';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialStateValue, () => {
    const localStorageState = localStorage.getItem('state');
    if (!localStorageState) return initialStateValue;
    const parsedState = JSON.parse(localStorageState) as TaskStateModel;
    return {
      ...parsedState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    };
  });
  // O REF É DO TIPO DA FN QUE É RETORNADA PELA OUTRA FN QUE CARREGA O ÁUDIO
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  const worker = TimerWorkerManager.getInstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data;
    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        // RESET APÓS O SOM FINALIZAR
        playBeepRef.current = null;
      }
      dispatch({ type: TaskActionTypes.COMPLETE_TASK });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
    if (!state.activeTask) worker.terminate();
    // PASSAR O ESTADO PARA DENTRO DO WORKER
    document.title = `${state.formattedSecondsRemaining} - Chronos App`;
    worker.postMessage(state);
  }, [worker, state]);

  // CARREGAR O ÁUDIO
  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
