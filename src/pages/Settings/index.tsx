import { SaveIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ToastAdapter } from '../../adapters/ToastAdapter';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { useTasks } from '../../contexts/TaskContext/useTasks';
import { MainTemplate } from '../../templates/MainTemplate';

export function Settings() {
  const { state, dispatch } = useTasks();
  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null);
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    ToastAdapter.dismiss();

    const formErrors = [];

    const workTime = Number(workTimeInputRef.current?.value);
    const shortBreakTime = Number(shortBreakTimeInputRef.current?.value);
    const longBreakTime = Number(longBreakTimeInputRef.current?.value);

    if (isNaN(workTime)) formErrors.push('Focus time needs to be a number');
    if (isNaN(shortBreakTime))
      formErrors.push('Short break time needs to be a number');
    if (isNaN(longBreakTime))
      formErrors.push('Long break time needs to be a number');

    if (workTime < 1 || workTime > 99)
      formErrors.push(
        'Focus time needs to be greater than 0 and smaller than 100',
      );
    if (shortBreakTime < 1 || shortBreakTime > 30)
      formErrors.push(
        'Short break time needs to be greater than 0 and smaller than 30',
      );
    if (longBreakTime < 1 || longBreakTime > 60)
      formErrors.push(
        'Long break time needs to be greater than 0 and smaller than 60',
      );

    if (formErrors.length > 0) {
      formErrors.forEach(error => ToastAdapter.error(error));
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: { workTime, shortBreakTime, longBreakTime },
    });
    ToastAdapter.success("All set successfully.")
  }

  useEffect(() => {
      document.title = 'Settings - Chronos App';
    }, []);
  return (
    <MainTemplate>
      <Container>
        <Heading>Settings</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>
          Modify time for focus, short break and long break.
        </p>
      </Container>
      <Container>
        <form onSubmit={handleSaveSettings} className='form'>
          <div className='formRow'>
            <Input
              ref={workTimeInputRef}
              id='workTime'
              labelText='Focus'
              defaultValue={state.config.workTime}
              type='number'
              maxLength={2}
            />
          </div>
          <div className='formRow'>
            <Input
              ref={shortBreakTimeInputRef}
              id='shortBreakTime'
              labelText='Short break'
              defaultValue={state.config.shortBreakTime}
              type='number'
              maxLength={2}
            />
          </div>
          <div className='formRow'>
            <Input
              ref={longBreakTimeInputRef}
              id='longBreakTime'
              labelText='Long break'
              defaultValue={state.config.longBreakTime}
              type='number'
              maxLength={2}
            />
          </div>
          <div className='formRow'>
            <Button
              icon={<SaveIcon />}
              aria-label='Save settings'
              title='Save settings'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
