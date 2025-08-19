import React from "react";
import styles from "./Spinner.module.scss";

type SpinnerProps = {
  size?: number; 
};

const Spinner = ({ size = 100 }: SpinnerProps) => {
  return (
    <div
      className={styles.spinner}
      style={{ width: size, height: size }}
    />
  );
};

export default Spinner;
