import { useTasks } from '../../contexts/TaskContext/useTasks';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTasks();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const infoNoactiveTask = {
    workTime: <span>Next cycle: {state.config.workTime}min</span>,
    shortBreakTime: <span>Next cycle: {state.config.workTime}min</span>,
    longBreakTime: <span>Next cycle: Long Break</span>,
  };

  const infoactiveTask = {
    workTime: <span>Focus for {state.config.workTime}min</span>,
    shortBreakTime: <span>Take a break for {state.config.shortBreakTime}min</span>,
    longBreakTime: <span>Long Break</span>,
  };

  return (
    <>
      {!!state.activeTask && infoactiveTask[state.activeTask.type]}
      {!state.activeTask && infoNoactiveTask[nextCycleType]}
    </>
  );
}
