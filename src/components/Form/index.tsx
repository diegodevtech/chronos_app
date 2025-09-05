import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';
import { ToastAdapter } from '../../adapters/ToastAdapter';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { useTasks } from '../../contexts/TaskContext/useTasks';
import type { TaskModel } from '../../models/TaskModel';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { Button } from '../Button';
import Cycles from '../Cycles';
import { Input } from '../Input';
import { Tips } from '../Tips';

export function Form() {
  const taskInputRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useTasks();
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    ToastAdapter.dismiss();
    if (taskInputRef.current === null) return;
    const taskname = taskInputRef.current.value.trim();
    if (!taskname) {
      ToastAdapter.error('Task name must be provided.');
      return;
    }

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskname,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    ToastAdapter.success('Task Started');
  }

  function handleStopTask() {
    ToastAdapter.dismiss();
    ToastAdapter.warning('Task Stopped');
    dispatch({ type: TaskActionTypes.STOP_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form'>
      <div className='formRow'>
        <Input
          ref={taskInputRef}
          id='meuInput'
          type='text'
          labelText='Task'
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>
      <div className='formRow'>
        <Tips />
      </div>
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}
      <div className='formRow'>
        {!state.activeTask && (
          <Button
            aria-label='Start New Task'
            title='Start New Task'
            type='submit'
            icon={<PlayCircleIcon />}
            key='Submit_Button'
          />
        )}
        {!!state.activeTask && (
          <Button
            aria-label='Stop Task'
            title='Stop Task'
            type='button'
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleStopTask}
            key='Stop_Button'
          />
        )}
      </div>
    </form>
  );
}
