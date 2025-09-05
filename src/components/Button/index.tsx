import styles from './styles.module.css';

type ButtonProps = {
  icon: React.ReactNode;
  color?: 'green' | 'red'
  // INTERSECTION TYPES: EXTENDENDO TUDO QUE TIVER DE PROP DENTRO DO BUTTON
} & React.ComponentProps<'button'>;

export function Button({ icon, color = 'green', ...props }: ButtonProps) {
  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...props}>
        {icon}
      </button>
    </>
  );
}
