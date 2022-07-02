import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./NotFound.module.css";
import notFoundImage from "../images/NotFound.png";

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <img className={styles.notFoundImg} src={notFoundImage} alt="Failed To Load" />
      <Link className={styles.link} to='/'>
        <button className={styles.notFoundButton}>Go Back To Home</button>
      </Link>
    </div>
  )
}

export default NotFound