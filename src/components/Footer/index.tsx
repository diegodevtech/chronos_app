import { RouterLink } from '../RouterLink';
import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro'>
        {' '}
        Learn Pomodoro technique
      </RouterLink>
      <RouterLink href='/'>
        {' '}
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Diego Dev Tech
      </RouterLink>
    </footer>
  );
}
