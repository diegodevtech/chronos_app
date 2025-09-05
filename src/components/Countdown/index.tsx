import { useTasks } from '../../contexts/TaskContext/useTasks';
import styles from './styles.module.css';

export function Countdown() {

  const { state: { formattedSecondsRemaining } } = useTasks();
  return <div className={styles.container}>{formattedSecondsRemaining}</div>;
}
