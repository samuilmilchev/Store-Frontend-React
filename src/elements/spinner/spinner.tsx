import * as styles from "./spinner.module.scss";

function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.doubleBounce1} />
      <div className={styles.doubleBounce2} />
    </div>
  );
}

export default Spinner;
