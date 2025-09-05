import { useTasks } from '../../contexts/TaskContext/useTasks';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export default function Cycles() {
  const { state } = useTasks();
  const cycleStep = Array.from({ length: state.currentCycle });

  const cycleDescription = {
    workTime: 'focus',
    shortBreakTime: 'short break',
    longBreakTime: 'long break'
  }

  return (
    <div className={styles.cycles}>
      <span>Cycles:</span>
      <div className={styles.cycleDots}>
        {
          cycleStep.map((_,index) => {
            const nextCycle = getNextCycle(index);
            const nextCycleType = getNextCycleType(nextCycle);
            return (
              <span
                key={`${nextCycleType}_${nextCycle}`}
                aria-label={`Indicator of a ${cycleDescription[nextCycleType]} cycle`}
                title={`Indicator of a ${cycleDescription[nextCycleType]} cycle`}
                className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              ></span>
            );
          })
        }
        
      </div>
    </div>
  );
}
