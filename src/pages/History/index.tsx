import { ArrowUpDownIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ToastAdapter } from '../../adapters/ToastAdapter';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { useTasks } from '../../contexts/TaskContext/useTasks';
import { MainTemplate } from '../../templates/MainTemplate';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import styles from './styles.module.css';

export function History() {
  const { state, dispatch } = useTasks();
  const [confirmClearing, setConfirmClearing] = useState(false);
  const hasTasks = state.tasks.length > 0;

  const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );

  function handleSortTasks({
    field,
  }: Omit<SortTasksOptions, 'tasks' | 'direction'>) {
    const newDirection = sortTaskOptions.direction === 'desc' ? 'asc' : 'desc';
    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTaskOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    ToastAdapter.dismiss();
    ToastAdapter.confirm('Sure?', confirmation => {
      setConfirmClearing(confirmation);
    });
  }

  useEffect(() => {
    document.title = 'History - Chronos App';
  }, []);

  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClearing) return;
    dispatch({ type: TaskActionTypes.RESET_STATE });
    setConfirmClearing(false);
  }, [confirmClearing, dispatch]);

  useEffect(() => {
    return () => {
      ToastAdapter.dismiss();
    };
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <Button
                icon={<TrashIcon />}
                color='red'
                aria-label='Delete History'
                title='Delete History'
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>
      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: 'name' })}
                  >
                    <span>
                      Task <ArrowUpDownIcon width={20} />
                    </span>
                  </th>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: 'duration' })}
                  >
                    <span>
                      Duration <ArrowUpDownIcon width={20} />
                    </span>
                  </th>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                  >
                    <span>
                      Start Date <ArrowUpDownIcon width={20} />
                    </span>
                  </th>
                  <th>Status</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {sortTaskOptions.tasks.map(task => {
                  const taskTypeDict = {
                    workTime: 'Work time',
                    shortBreakTime: 'Short break time',
                    longBreakTime: 'Long break time',
                  };
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration} min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDict[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && (
          <p className={styles.noTasks}>No tasks until the moment</p>
        )}
      </Container>
    </MainTemplate>
  );
}
