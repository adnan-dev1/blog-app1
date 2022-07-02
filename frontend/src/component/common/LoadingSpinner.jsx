import React from 'react'
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ locationClass }) => {
  return (
    <div className={styles.loadingSpin + ` ${styles[locationClass]}`}></div>
  )
}

export default LoadingSpinner