import styles from './styles.module.css';

type InputProps = {
  id: string;
  labelText: string;
  // INTERSECTION TYPES: EXTENDENDO TUDO QUE TIVER DE PROP DENTRO DO INPUT
} & React.ComponentProps<'input'>;

export function Input({ id, labelText, type, ...props }: InputProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input className={styles.input} id={id} type={type} {...props} placeholder='Value...'/>
    </>
  );
}
