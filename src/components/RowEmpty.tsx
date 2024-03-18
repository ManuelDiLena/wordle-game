import Box from "./Box";
import styles from './row.module.scss';

export default function RowEmpty() {
  return (
    <div className={styles.row}>
      {
        Array.from(Array(6)).map((_, i) => (
          <Box key={i} value='' status='empty' />
        ))
      }
    </div>
  );
}