import styles from "@/styles/progressIndicator.module.css";

const ProgressIndicator = ({ isLoading, children, className }: ProgressIndicatorProps) => {
  return (
    <>
      {isLoading && (
        <div className={(styles["indicator-container"], className)}>
          <div className={styles["indicator-wrapper"]}>
            <div className={styles["indicator"]}></div>
            {children && <div className={styles["indicator-text"]}>{children}</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressIndicator;
