import styles from "@/styles/spinner.module.css";

const Spinner = ({ children, className }: SpinnerProps) => {
  return (
    <div className={(styles["spinner-container"], className)}>
      <div className={styles["spinner-wrapper"]}>
        <div className={styles.spinner}></div>
        {children && <div className={styles["spinner-text"]}>{children}</div>}
      </div>
    </div>
  );
};

export default Spinner;
